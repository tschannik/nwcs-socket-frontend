import { sendPing } from '../services/ping.service';

function usePing() {
  const ping = async () => {
    try {
      return sendPing();
    } catch (err) {
      console.log(err);
    }
  };

  return {
    ping,
  };
}

export default usePing;
