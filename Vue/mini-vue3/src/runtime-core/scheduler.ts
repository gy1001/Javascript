const queue: any[] = []
let isFlushPending = false

const p = Promise.resolve()

export function queueJobs(job) {
  if (!queue.includes(job)) {
    queue.push(job)
  }
  // 执行任务
  queueFlush()
}

function queueFlush() {
  if (isFlushPending) return
  isFlushPending = true
  nextTick(flushJobs)
}

export function nextTick(fn) {
  return fn ? p.then(fn) : p
}

function flushJobs() {
  isFlushPending = false
  let job
  while ((job = queue.shift())) {
    job && job()
  }
}
