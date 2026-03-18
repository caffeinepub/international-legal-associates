import { Button } from "@/components/ui/button";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { useGetAllInquiries } from "@/hooks/useQueries";
import { LogIn, LogOut, RefreshCw, Shield } from "lucide-react";
import { motion } from "motion/react";

function InquiriesTable() {
  const { data: inquiries, isLoading, error, refetch } = useGetAllInquiries();
  const { clear } = useInternetIdentity();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-gold text-xs uppercase tracking-[0.2em] font-bold mb-1">
            Inquiry Dashboard
          </h3>
          <p className="text-white/60 text-sm">
            {inquiries
              ? `${inquiries.length} inquiries received`
              : "Loading..."}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            data-ocid="admin.secondary_button"
            className="border-white/20 text-white/70 hover:text-gold hover:border-gold bg-transparent rounded-none text-xs uppercase tracking-wider"
          >
            <RefreshCw className="w-3 h-3 mr-1.5" />
            Refresh
          </Button>
          <Button
            size="sm"
            onClick={clear}
            data-ocid="admin.delete_button"
            className="bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-none text-xs uppercase tracking-wider"
          >
            <LogOut className="w-3 h-3 mr-1.5" />
            Logout
          </Button>
        </div>
      </div>

      {isLoading && (
        <div data-ocid="admin.loading_state" className="text-center py-12">
          <RefreshCw className="w-6 h-6 text-gold animate-spin mx-auto mb-3" />
          <p className="text-white/50 text-sm">Loading inquiries...</p>
        </div>
      )}

      {error && (
        <div
          data-ocid="admin.error_state"
          className="bg-red-900/30 border border-red-500/30 rounded-sm p-4"
        >
          <p className="text-red-300 text-sm">
            Failed to load inquiries. Please try refreshing.
          </p>
        </div>
      )}

      {!isLoading && !error && inquiries && inquiries.length === 0 && (
        <div
          data-ocid="admin.empty_state"
          className="text-center py-16 border border-white/10 rounded-sm"
        >
          <Shield className="w-10 h-10 text-white/20 mx-auto mb-4" />
          <p className="text-white/50 text-sm uppercase tracking-widest">
            No inquiries yet
          </p>
        </div>
      )}

      {!isLoading && inquiries && inquiries.length > 0 && (
        <div className="overflow-x-auto" data-ocid="admin.table">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                <th className="text-left text-gold text-xs uppercase tracking-widest font-semibold pb-3 pr-4">
                  #
                </th>
                <th className="text-left text-gold text-xs uppercase tracking-widest font-semibold pb-3 pr-4">
                  Name
                </th>
                <th className="text-left text-gold text-xs uppercase tracking-widest font-semibold pb-3 pr-4">
                  Email
                </th>
                <th className="text-left text-gold text-xs uppercase tracking-widest font-semibold pb-3 pr-4">
                  Phone
                </th>
                <th className="text-left text-gold text-xs uppercase tracking-widest font-semibold pb-3">
                  Message
                </th>
              </tr>
            </thead>
            <tbody>
              {inquiries.map((inquiry, i) => (
                <tr
                  key={String(inquiry.id)}
                  data-ocid={`admin.row.item.${i + 1}`}
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
                  className="hover:bg-white/5 transition-colors"
                >
                  <td className="py-3 pr-4 text-white/40 text-xs">{i + 1}</td>
                  <td className="py-3 pr-4 text-white font-medium whitespace-nowrap">
                    {inquiry.name}
                  </td>
                  <td className="py-3 pr-4">
                    <a
                      href={`mailto:${inquiry.email}`}
                      className="text-gold/80 hover:text-gold transition-colors"
                    >
                      {inquiry.email}
                    </a>
                  </td>
                  <td className="py-3 pr-4">
                    {inquiry.phone ? (
                      <a
                        href={`tel:${inquiry.phone}`}
                        className="text-white/60 hover:text-white transition-colors"
                      >
                        {inquiry.phone}
                      </a>
                    ) : (
                      <span className="text-white/20">—</span>
                    )}
                  </td>
                  <td className="py-3 text-white/60 max-w-xs">
                    <p className="line-clamp-2 leading-relaxed">
                      {inquiry.message}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default function Admin() {
  const { identity, login, isLoggingIn } = useInternetIdentity();

  const isLoggedIn = identity && !identity.getPrincipal().isAnonymous();

  return (
    <section
      id="admin"
      className="py-24"
      style={{ background: "oklch(0.14 0.04 243)" }}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-px w-8 bg-gold" />
            <span className="text-gold text-xs font-semibold uppercase tracking-[0.2em]">
              Restricted Area
            </span>
            <div className="h-px w-8 bg-gold" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-black uppercase text-white tracking-tight">
            Admin Panel
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-5xl mx-auto"
        >
          <div
            className="rounded-sm p-8"
            style={{
              background: "oklch(0.22 0.055 243)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {!isLoggedIn ? (
              <div className="text-center py-8" data-ocid="admin.panel">
                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-gold" />
                </div>
                <h3 className="text-white font-bold text-xl uppercase tracking-wider mb-2">
                  Admin Access
                </h3>
                <p className="text-white/50 text-sm mb-8 max-w-sm mx-auto">
                  Login with Internet Identity to securely access the inquiry
                  dashboard.
                </p>
                <Button
                  onClick={login}
                  disabled={isLoggingIn}
                  data-ocid="admin.primary_button"
                  className="bg-gold hover:bg-gold/90 text-navy font-bold uppercase tracking-widest text-sm px-8 py-3 h-auto rounded-none transition-all duration-200"
                >
                  {isLoggingIn ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Connecting...
                    </>
                  ) : (
                    <>
                      <LogIn className="w-4 h-4 mr-2" />
                      Login with Internet Identity
                    </>
                  )}
                </Button>
              </div>
            ) : (
              <InquiriesTable />
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
