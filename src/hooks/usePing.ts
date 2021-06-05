import { sendPing } from '../services/ping.service';

function usePing() {
  const ping = async () => {
    return sendPing();
  };

  return {
    ping,
  };
}

export default usePing;
