import { kvdb, collection, type KvObject } from "../mod.ts"
import { indexableCollection } from "../src/indexable_collection.ts"

export interface Person extends KvObject {
  name: string,
  age: number,
  friends: string[],
  address: {
    country: string,
    city: string,
    postcode: number
  }
}

export const testPerson: Person = {
  name: "Oliver",
  age: 24,
  friends: ["Elias", "Anders"],
  address: {
    country: "Norway",
    city: "Bergen",
    postcode: 420
  }
}

export const db = kvdb({
  people: collection<Person>(["people"]),
  indexablePeople: indexableCollection<Person>(["indexablePeople"], {
    name: true
  }),
  values: {
    numbers: collection<number>(["values", "numbers"]),
    strings: collection<string>(["values", "strings"]),
    u64s: collection<Deno.KvU64>(["values", "u64s"])
  }
})

export async function reset() {
  await db.people.deleteMany()
  await db.indexablePeople.deleteMany()
  await db.values.numbers.deleteMany()
  await db.values.strings.deleteMany()
  await db.values.u64s.deleteMany()
}