import common from './config.default';
import local from './config.local';
import prod from './config.prod';

const getConfig = () => {
  const stage = process.env.REACT_APP_STAGE;
  switch (stage) {
    case 'local':
      return { ...common, ...local };
    default:
      return { ...common, ...prod };
  }
};

export default getConfig();
