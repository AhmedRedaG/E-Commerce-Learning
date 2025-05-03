import { join } from "path";

const path = (...pathNames) => {
  return join(process.cwd(), ...pathNames);
};

export default path;
