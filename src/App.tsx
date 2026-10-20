import { useState, useEffect } from 'react';
import SkylightSelector from '@/components/SkylightSelector';
import ArchitectSelector from '@/components/ArchitectSelector';

function getCustomerId(): string {
  if (typeof window === 'undefined' || !window.location) {
    return 'velux';
  }

  // 1. Query parameter override (e.g., ?customer=bunnings or ?partner=bunnings)
  const searchParams = new URLSearchParams(window.location.search);
  const paramCustomer = searchParams.get('customer') || searchParams.get('partner');
  if (paramCustomer) {
    return paramCustomer.toLowerCase();
  }

  // 2. Read customer ID from URL path (e.g., skylightselector.com.au/bunnings or /spectool)
  const pathParts = window.location.pathname.split('/').filter(Boolean);
  if (pathParts.length > 0 && pathParts[0].toLowerCase() !== 'velux') {
    return pathParts[0].toLowerCase();
  }

  // 3. Detect customer ID from subdomain or preview host (e.g., bunnings.skylightselector.com.au)
  const hostname = window.location.hostname.toLowerCase();
  const knownPartners = [
    'bunnings',
    'stratco',
    'bowens',
    'dahlsens',
    'mitre10',
    'no1',
    'reece',
    'skylightswa',
    'carterroofing',
    'peak',
    'statewide',
    'steelroofing',
    'vsky',
    'saskylights'
  ];

  for (const partner of knownPartners) {
    if (
      hostname.startsWith(`${partner}.`) ||
      hostname.includes(`-${partner}-`) ||
      hostname.includes(`-${partner}.`) ||
      hostname.endsWith(`-${partner}`)
    ) {
      return partner;
    }
  }

  // 4. Generic subdomain fallback (e.g., [partner].skylightselector.com.au)
  const hostParts = hostname.split('.');
  if (hostParts.length > 2) {
    const sub = hostParts[0];
    if (!['www', 'skylightselector', 'velux', 'localhost', 'dev'].includes(sub)) {
      return sub;
    }
  }

  return 'velux';
}

function App() {
  const [customerMapping, setCustomerMapping] = useState<Record<string, string> | null>(null);
  const [loading, setLoading] = useState(true);

  const customerId = getCustomerId();

  useEffect(() => {
    const loadConfig = async () => {
      if (customerId && customerId !== 'velux' && customerId !== 'spectool') {
        try {
          const mapping = await import(`./data/${customerId}-mapping.json`);
          const data = mapping.default || mapping;
          if (data && typeof data === 'object' && Object.keys(data).length > 0) {
            setCustomerMapping(data);
          } else {
            setCustomerMapping(null);
          }
        } catch (e) {
          console.warn(`No specific config found for customer: ${customerId}`);
          setCustomerMapping(null);
        }
      } else {
        setCustomerMapping(null);
      }
      setLoading(false);
    };
    loadConfig();
  }, [customerId]);

  if (loading) {
     return <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20">
      {customerId === 'spectool' ? (
        <ArchitectSelector />
      ) : (
        <SkylightSelector customerId={customerId} customerMapping={customerMapping} />
      )}
    </div>
  );
}

export default App;
