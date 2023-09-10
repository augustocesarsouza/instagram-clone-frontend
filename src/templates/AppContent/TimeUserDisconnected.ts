import { Following } from "./AppContent";

export function TimeUserDisconnected(setMyFollowing: React.Dispatch<React.SetStateAction<Following[]>>) {
  // Porque esse valores porque 1 Min 60000 milissegundos, 1 hora 60 min, 60 x 60000, porque 6000=1min, Dia 24 horas 24x60=1440 Min,
  // 1440 x 60000 = 86400000, assim por diante!
  const MINUTE_IN_MS = 60000;
  const HOUR_IN_MS = 3600000;
  const DAY_IN_MS = 86400000;
  const WEEK_IN_MS = 604800000;
  const MES_IN_MS = 2678400000;

      setMyFollowing((mf) => {
        const updatedFollowing = mf.map((f) => {
          if (!f.isOnline) {
            const lastDisconnectedTimeMs = f.lastDisconnectedTimeMinutes * MINUTE_IN_MS;
            let measureOfTime = 'minuto';
            let disconnectedTime = lastDisconnectedTimeMs;  

            if (disconnectedTime >= MES_IN_MS) {
              measureOfTime = 'mes';
              disconnectedTime /= MES_IN_MS;
              disconnectedTime = Math.floor(disconnectedTime);
            } else if (disconnectedTime >= WEEK_IN_MS) {
              measureOfTime = 'semana';
              disconnectedTime /= WEEK_IN_MS;
            } else if (disconnectedTime >= DAY_IN_MS) {
              measureOfTime = 'dia';
              disconnectedTime /= DAY_IN_MS;
            } else if (disconnectedTime >= HOUR_IN_MS) {
              measureOfTime = 'hora';
              disconnectedTime /= HOUR_IN_MS;
            } else {
              disconnectedTime /= MINUTE_IN_MS;
            }

            disconnectedTime = Math.min(Math.floor(disconnectedTime), measureOfTime === 'semana' ? 4 : 59);

            return {
              ...f,
              measureOfTime,
              lastDisconnected: disconnectedTime,
              lastDisconnectedTimeMinutes: f.lastDisconnectedTimeMinutes + 1,
            };
          }
          return f;
      });
    return updatedFollowing;
  });
}