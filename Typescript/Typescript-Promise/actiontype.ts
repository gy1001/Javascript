type ResolveType = (value: any) => void
type RejectType = (value: any) => void

type Executor = (resolve: ResolveType, reject: RejectType) => void

export { RejectType, ResolveType, Executor }
