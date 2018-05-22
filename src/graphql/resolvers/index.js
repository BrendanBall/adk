export default function rootResolver () {
  return {
    Query: {
      testQuery (obj, ctx, args, info) { return 'hello world' }
    }
  }
}
