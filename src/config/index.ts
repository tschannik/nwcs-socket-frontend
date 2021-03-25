import common from './config.default';
import local from './config.local';

const getConfig = () => {
  const stage = process.env.REACT_APP_STAGE;
  switch (stage) {
    case 'local':
      return { ...common, ...local };
    default:
      throw new Error('No stage specified');
  }
};

export default getConfig();
