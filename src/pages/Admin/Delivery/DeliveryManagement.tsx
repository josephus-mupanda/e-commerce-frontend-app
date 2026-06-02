import { useEffect, useState } from "react";
import Breadcrumbs from "@/components/pageProps/Breadcrumbs";
import apiClient from "@/store/apiClient";
import { BASE_URL } from "@/constants/config";
import { toast } from "sonner";
import LoadingSpinner from "@/components/Loading/LoadingSpinner";

const DeliveryManagement = () => {
  const [zones, setZones] = useState<any[]>([]);
  const [runs, setRuns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingZone, setSavingZone] = useState(false);
  const [zoneId, setZoneId] = useState("");
  const [zoneForm, setZoneForm] = useState({
    country: "RW",
    city: "",
    sector: "",
    name: "",
    deliveryProvider: "VUBA_VUBA",
  });
  const [driverName, setDriverName] = useState("");
  const [driverPhone, setDriverPhone] = useState("");
  const [planning, setPlanning] = useState(false);

  const load = async () => {
    try {
      setLoading(true);
      const [zonesRes, runsRes] = await Promise.all([
        apiClient.get(`${BASE_URL}/api/admin/delivery/zones`),
        apiClient.get(`${BASE_URL}/api/admin/delivery/runs`),
      ]);
      setZones(Array.isArray(zonesRes.data) ? zonesRes.data : []);
      setRuns(Array.isArray(runsRes.data) ? runsRes.data : []);
    } catch {
      toast.error("Impossible de charger les livraisons.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const planRun = async () => {
    if (!zoneId) {
      toast.error("Choisissez une zone.");
      return;
    }
    setPlanning(true);
    try {
      await apiClient.post(`${BASE_URL}/api/admin/delivery/runs/plan`, {
        zoneId,
        runDate: new Date().toISOString().slice(0, 10),
        driverName,
        driverPhone,
      });
      toast.success("Tournée planifiée (ordre par secteur).");
      await load();
    } catch {
      toast.error("Échec de la planification.");
    } finally {
      setPlanning(false);
    }
  };

  const markDelivered = async (runId: string, stopId: string) => {
    try {
      await apiClient.patch(
        `${BASE_URL}/api/admin/delivery/runs/${runId}/stops/${stopId}`,
        { status: "DELIVERED" }
      );
      toast.success("Arrêt livré.");
      await load();
    } catch {
      toast.error("Mise à jour impossible.");
    }
  };

  const createZone = async () => {
    if (!zoneForm.city || !zoneForm.name) {
      toast.error("Ville et nom de zone requis.");
      return;
    }
    setSavingZone(true);
    try {
      await apiClient.post(`${BASE_URL}/api/admin/delivery/zones`, zoneForm);
      toast.success("Zone créée.");
      setZoneForm((z) => ({ ...z, city: "", sector: "", name: "" }));
      await load();
    } catch {
      toast.error("Impossible de créer la zone.");
    } finally {
      setSavingZone(false);
    }
  };

  const toggleZoneActive = async (zone: any) => {
    try {
      if (zone.active) {
        await apiClient.delete(`${BASE_URL}/api/admin/delivery/zones/${zone.id}`);
      } else {
        await apiClient.put(`${BASE_URL}/api/admin/delivery/zones/${zone.id}`, {
          ...zone,
          active: true,
        });
      }
      await load();
    } catch {
      toast.error("Mise à jour de la zone impossible.");
    }
  };

  if (loading) {
    return (
      <div className="py-10">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="max-w-container mx-auto px-4 space-y-6">
      <Breadcrumbs title="Livraisons" prevLocation="Admin" />
      <p className="text-sm text-lightText max-w-2xl">
        Regroupez les commandes par zone (Kigali, Lagos…) et suivez une tournée dans l&apos;ordre
        des secteurs — comme Vuba Vuba ou un partenaire type SafeBoda au Nigeria.
      </p>

      <div className="jshop-form-card p-4 space-y-3 max-w-3xl">
        <h3 className="font-bold text-primeColor">Créer une zone manuellement</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <select
            className="border rounded-md px-3 py-2"
            value={zoneForm.country}
            onChange={(e) => setZoneForm((z) => ({ ...z, country: e.target.value }))}
          >
            <option value="RW">RW</option>
            <option value="NG">NG</option>
            <option value="KE">KE</option>
            <option value="UG">UG</option>
            <option value="OTHER">OTHER</option>
          </select>
          <input
            className="border rounded-md px-3 py-2"
            placeholder="Ville"
            value={zoneForm.city}
            onChange={(e) => setZoneForm((z) => ({ ...z, city: e.target.value }))}
          />
          <input
            className="border rounded-md px-3 py-2"
            placeholder="Secteur / Quartier"
            value={zoneForm.sector}
            onChange={(e) => setZoneForm((z) => ({ ...z, sector: e.target.value }))}
          />
          <input
            className="border rounded-md px-3 py-2 md:col-span-2"
            placeholder="Nom affiché de la zone"
            value={zoneForm.name}
            onChange={(e) => setZoneForm((z) => ({ ...z, name: e.target.value }))}
          />
          <select
            className="border rounded-md px-3 py-2"
            value={zoneForm.deliveryProvider}
            onChange={(e) =>
              setZoneForm((z) => ({ ...z, deliveryProvider: e.target.value }))
            }
          >
            <option value="VUBA_VUBA">VUBA_VUBA</option>
            <option value="SAFE_BORDER">SAFE_BORDER</option>
            <option value="INTERNAL">INTERNAL</option>
            <option value="PARTNER_OTHER">PARTNER_OTHER</option>
          </select>
        </div>
        <button
          type="button"
          disabled={savingZone}
          onClick={createZone}
          className="bg-[#FF8533] hover:bg-[#FF6A00] text-white px-4 py-2 rounded-md font-semibold"
        >
          {savingZone ? "Création..." : "Créer zone"}
        </button>
      </div>

      <div className="jshop-data-panel p-4 border rounded-lg">
        <h3 className="font-bold text-primeColor mb-3">Zones existantes</h3>
        <div className="space-y-2">
          {zones.map((z) => (
            <div key={z.id} className="flex flex-wrap items-center gap-2 text-sm">
              <span className="font-semibold">{z.name}</span>
              <span>
                ({z.country} / {z.city} / {z.sector || "—"} / {z.deliveryProvider})
              </span>
              <span
                className={`px-2 py-1 rounded text-xs ${
                  z.active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-700"
                }`}
              >
                {z.active ? "active" : "inactive"}
              </span>
              <button
                type="button"
                onClick={() => toggleZoneActive(z)}
                className="text-xs bg-slate-100 text-slate-800 px-2 py-1 rounded"
              >
                {z.active ? "Désactiver" : "Réactiver"}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="jshop-form-card p-4 space-y-3 max-w-xl">
        <h3 className="font-bold text-primeColor">Planifier une tournée</h3>
        <select
          className="w-full border rounded-md px-3 py-2"
          value={zoneId}
          onChange={(e) => setZoneId(e.target.value)}
        >
          <option value="">— Zone —</option>
          {zones.map((z) => (
            <option key={z.id} value={z.id}>
              {z.name} ({z.deliveryProvider})
            </option>
          ))}
        </select>
        <input
          className="w-full border rounded-md px-3 py-2"
          placeholder="Nom du livreur"
          value={driverName}
          onChange={(e) => setDriverName(e.target.value)}
        />
        <input
          className="w-full border rounded-md px-3 py-2"
          placeholder="Téléphone livreur"
          value={driverPhone}
          onChange={(e) => setDriverPhone(e.target.value)}
        />
        <button
          type="button"
          disabled={planning}
          onClick={planRun}
          className="bg-[#FF8533] hover:bg-[#FF6A00] text-white px-4 py-2 rounded-md font-semibold"
        >
          {planning ? "Planification…" : "Créer la tournée"}
        </button>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-lg text-primeColor">Tournées du jour</h3>
        {runs.length === 0 ? (
          <p className="text-sm text-gray-600">Aucune tournée pour aujourd&apos;hui.</p>
        ) : (
          runs.map((run) => (
            <div key={run.id} className="jshop-data-panel p-4 border rounded-lg">
              <p className="font-semibold">
                {run.zoneName} — {run.status} — {run.driverName || "Sans livreur"}
              </p>
              <ol className="mt-3 list-decimal list-inside space-y-2 text-sm">
                {(run.stops || []).map((stop: any) => (
                  <li key={stop.id} className="flex flex-wrap items-center gap-2">
                    <span>
                      #{stop.stopSequence} {stop.addressSnapshot} — {stop.status}
                    </span>
                    {stop.status === "PENDING" && (
                      <button
                        type="button"
                        className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded"
                        onClick={() => markDelivered(run.id, stop.id)}
                      >
                        Livré
                      </button>
                    )}
                  </li>
                ))}
              </ol>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DeliveryManagement;
