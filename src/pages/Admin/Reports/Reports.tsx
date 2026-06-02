import { useEffect, useState } from "react";
import Breadcrumbs from "@/components/pageProps/Breadcrumbs";
import apiClient from "@/store/apiClient";
import { BASE_URL } from "@/constants/config";
import { toast } from "sonner";
import LoadingSpinner from "@/components/Loading/LoadingSpinner";

const Reports = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await apiClient.get(`${BASE_URL}/api/admin/reports/dashboard`);
        setData(res.data);
      } catch {
        toast.error("Rapports indisponibles.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className="py-10">
        <LoadingSpinner />
      </div>
    );
  }

  const overview = data?.overview;
  const byRegion = data?.byRegion || [];
  const byChannel = data?.byChannel || [];

  return (
    <div className="max-w-container mx-auto px-4 space-y-6">
      <Breadcrumbs title="Rapports" prevLocation="Admin" />
      <p className="text-sm text-lightText max-w-2xl">
        Ventes, canaux (WhatsApp vs web) et charge par région — pour décider où envoyer la
        prochaine tournée.
      </p>

      {overview && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Stat label="Commandes" value={overview.totalOrders} />
          <Stat label="Revenu (RWF)" value={Math.round(overview.totalRevenue).toLocaleString()} />
          <Stat label="Via WhatsApp" value={overview.whatsappOrders} />
          <Stat label="Tournées actives" value={overview.activeDeliveryRuns} />
        </div>
      )}

      <section>
        <h3 className="font-bold text-primeColor mb-2">Par canal</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-2 text-left">Canal</th>
                <th className="p-2 text-left">Commandes</th>
                <th className="p-2 text-left">Revenu</th>
              </tr>
            </thead>
            <tbody>
              {byChannel.map((row: any) => (
                <tr key={row.channel} className="border-t">
                  <td className="p-2">{row.channel}</td>
                  <td className="p-2">{row.orderCount}</td>
                  <td className="p-2">{Math.round(row.revenue).toLocaleString()} RWF</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h3 className="font-bold text-primeColor mb-2">Par région (ville / secteur)</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-2 text-left">Pays</th>
                <th className="p-2 text-left">Ville</th>
                <th className="p-2 text-left">Secteur</th>
                <th className="p-2 text-left">Commandes</th>
                <th className="p-2 text-left">En attente</th>
                <th className="p-2 text-left">Revenu</th>
              </tr>
            </thead>
            <tbody>
              {byRegion.map((row: any, i: number) => (
                <tr key={i} className="border-t">
                  <td className="p-2">{row.country}</td>
                  <td className="p-2">{row.city}</td>
                  <td className="p-2">{row.sector || "—"}</td>
                  <td className="p-2">{row.orderCount}</td>
                  <td className="p-2">{row.pendingCount}</td>
                  <td className="p-2">{Math.round(row.revenue).toLocaleString()} RWF</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

const Stat = ({ label, value }: { label: string; value: string | number }) => (
  <div className="jshop-data-panel p-4 rounded-lg">
    <p className="text-xs uppercase text-gray-500">{label}</p>
    <p className="text-xl font-black text-primeColor">{value}</p>
  </div>
);

export default Reports;
