declare module 'consola/src/node' {
  // export type * from 'consola'
  import { Consola } from 'consola'
  // const consolaGlobalInstance = new Consola()
  // export default consolaGlobalInstance
  declare const consolaGlobalInstance: Consola

  export default consolaGlobalInstance
}
