export const enum ShapeFlags {
  ELEMENT = 1, // 0001
  STATEFUL_COMPONENT = 1 << 1, // 0010 (左移一位)
  TEXT_CHILDREN = 1 << 2, // 左移两位 0100
  ARRAY_CHILDREN = 1 << 3, // 左移三位 1000
  SLOT_CHILDREN = 1 << 4, // 左移四位 10000
}
