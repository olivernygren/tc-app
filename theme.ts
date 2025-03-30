import {
  defineConfig, createSystem, SystemConfig
} from '@chakra-ui/react';

const config: SystemConfig = defineConfig({
  theme: {
  },
});

const system = createSystem(config);

export default system;
