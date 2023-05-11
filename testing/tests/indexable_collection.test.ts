import { db, testPerson, reset, testPerson2 } from "../config.ts"
import { assert } from "../deps.ts"

Deno.test("indexable_collection", async t1 => {
  // Test the configuration
  await t1.step("config", async t2 => {
    await t2.step("Should not find document by index after reset", async () => {
      await reset()

      const indexDoc = await db.indexablePeople.findByIndex({
        name: testPerson.name
      })

      assert(indexDoc === null)
    })
  })

  // Test "add" method
  await t1.step("add", async t2 => {
    await t2.step("Should add document to collection by id and defined index", async () => {
      await reset()

      const cr = await db.indexablePeople.add(testPerson)
      if (!cr.ok) throw Error("Did not add document to collection successfully")

      const idDoc = await db.indexablePeople.find(cr.id)
      assert(idDoc !== null)
      assert(idDoc.value.name === testPerson.name)

      const indexDoc = await db.indexablePeople.findByIndex({
        name: testPerson.name
      })

      assert(indexDoc !== null)
      assert(indexDoc.value.name === testPerson.name)
    })

    await t2.step("Should add document to collection by id, but not by undefined index", async () => {
      await reset()

      const cr = await db.indexablePeople.add(testPerson)
      if (!cr.ok) throw Error("Did not add document to collection successfully")

      const idDoc = await db.indexablePeople.find(cr.id)
      assert(idDoc !== null)
      assert(idDoc.value.name === testPerson.name)

      const indexDoc = await db.indexablePeople.findByIndex({
        age: testPerson.age
      })

      assert(indexDoc === null)
    })

    await t2.step("Should add document to collection by id and only defined index", async () => {
      await reset()

      const cr = await db.indexablePeople.add(testPerson)
      if (!cr.ok) throw Error("Did not add document to collection successfully")

      const idDoc = await db.indexablePeople.find(cr.id)
      assert(idDoc !== null)
      assert(idDoc.value.name === testPerson.name)

      const indexDoc = await db.indexablePeople.findByIndex({
        name: testPerson.name
      })

      assert(indexDoc !== null)
      assert(idDoc.value.name === testPerson.name)

      const undefinedDoc = await db.indexablePeople.findByIndex({
        age: testPerson.age
      })

      assert(undefinedDoc === null)
    })
  })

  // Test "set" method
  await t1.step("set", async t2 => {
    await t2.step("Should add document to collection by given id and defined index", async () => {
      await reset()

      const id = "oliver"

      const cr = await db.indexablePeople.set(id, testPerson)
      if (!cr.ok) throw Error("Did not add document to collection successfully")

      const idDoc = await db.indexablePeople.find(id)
      assert(idDoc !== null)
      assert(idDoc.value.name === testPerson.name)

      const indexDoc = await db.indexablePeople.findByIndex({
        name: testPerson.name
      })

      assert(indexDoc !== null)
      assert(indexDoc.value.name === testPerson.name)
    })

    await t2.step("Should add document to collection by given id, but not by undefined index", async () => {
      await reset()

      const id = "oliver"

      const cr = await db.indexablePeople.set(id, testPerson)
      if (!cr.ok) throw Error("Did not add document to collection successfully")

      const idDoc = await db.indexablePeople.find(cr.id)
      assert(idDoc !== null)
      assert(idDoc.value.name === testPerson.name)

      const indexDoc = await db.indexablePeople.findByIndex({
        age: testPerson.age
      })

      assert(indexDoc === null)
    })

    await t2.step("Should add document to collection by given id and only defined index", async () => {
      await reset()

      const id = "oliver"

      const cr = await db.indexablePeople.set(id, testPerson)
      if (!cr.ok) throw Error("Did not add document to collection successfully")

      const idDoc = await db.indexablePeople.find(id)
      assert(idDoc !== null)
      assert(idDoc.value.name === testPerson.name)

      const indexDoc = await db.indexablePeople.findByIndex({
        name: testPerson.name
      })

      assert(indexDoc !== null)
      assert(idDoc.value.name === testPerson.name)

      const undefinedDoc = await db.indexablePeople.findByIndex({
        age: testPerson.age
      })

      assert(undefinedDoc === null)
    })
  })

  // Test "findByIndex" method
  await t1.step("findByIndex", async t2 => {
    await t2.step("Should find document by index", async () => {
      await reset()

      const cr = await db.indexablePeople.add(testPerson)
      if (!cr.ok) throw Error("document was not added to collection usccessfully")

      const indexDoc = await db.indexablePeople.findByIndex({
        name: testPerson.name
      })

      assert(indexDoc !== null)
      assert(indexDoc.id === cr.id)
      assert(indexDoc.value.name === testPerson.name)
    })

    await t2.step("Should not find document by undefined index", async () => {
      await reset()

      const cr = await db.indexablePeople.add(testPerson)
      if (!cr.ok) throw Error("document was not added to collection usccessfully")

      const indexDoc = await db.indexablePeople.findByIndex({
        age: testPerson.age
      })

      assert(indexDoc === null)
    })

    await t2.step("Should find document by selection of defined and undefined index", async () => {
      await reset()

      const cr = await db.indexablePeople.add(testPerson)
      if (!cr.ok) throw Error("document was not added to collection usccessfully")

      const indexDoc = await db.indexablePeople.findByIndex({
        age: testPerson.age,
        name: testPerson.name
      })

      assert(indexDoc !== null)
      assert(indexDoc.id === cr.id)
      assert(indexDoc.value.name === testPerson.name)
    })
  })

  // Test "delete" method
  await t1.step("delete", async t2 => {
    await t2.step("Should delete all index entries of document", async () => {
      await reset()

      const cr = await db.indexablePeople.add(testPerson)
      if (!cr.ok) throw Error("document was not added to collection usccessfully")

      const idDoc1 = await db.indexablePeople.find(cr.id)
      assert(idDoc1 !== null)

      const indexDoc1 = await db.indexablePeople.findByIndex({
        name: testPerson.name
      })
      assert(indexDoc1 !== null)

      await db.indexablePeople.delete(cr.id)

      const idDoc2 = await db.indexablePeople.find(cr.id)
      assert(idDoc2 === null)

      const indexDoc2 = await db.indexablePeople.findByIndex({
        name: testPerson.name
      })
      assert(indexDoc2 === null)
    })
  })

  // Test "deleteMany" method
  await t1.step("deleteMany", async t2 => {
    await t2.step("Should delete all document entries of all documents", async () => {
      await reset()

      // Add test objects
      const cr1 = await db.indexablePeople.add(testPerson)
      const cr2 = await db.indexablePeople.add(testPerson2)
      if (!cr1.ok || !cr2.ok) throw Error("documents were not added to collection successfully")

      // Check that test objects can be found by id and index before delete
      const idDoc1_1 = await db.indexablePeople.find(cr1.id)
      assert(idDoc1_1 !== null)

      const indexDoc1_1 = await db.indexablePeople.findByIndex({
        name: testPerson.name
      })
      assert(indexDoc1_1 !== null)

      const idDoc2_1 = await db.indexablePeople.find(cr2.id)
      assert(idDoc2_1 !== null)

      const indexDoc2_1 = await db.indexablePeople.findByIndex({
        name: testPerson2.name
      })
      assert(indexDoc2_1 !== null)

      // Delete test objects
      await db.indexablePeople.deleteMany()

      // Check that test objects can not be found by id and index after delete
      const idDoc1_2 = await db.indexablePeople.find(cr1.id)
      assert(idDoc1_2 === null)

      const indexDoc1_2 = await db.indexablePeople.findByIndex({
        name: testPerson.name
      })
      assert(indexDoc1_2 === null)

      const idDoc2_2 = await db.indexablePeople.find(cr2.id)
      assert(idDoc2_2 === null)

      const indexDoc2_2 = await db.indexablePeople.findByIndex({
        name: testPerson2.name
      })
      assert(indexDoc2_2 === null)
    })

    await t2.step("Should only delete document entries of filtered documents", async () => {
      await reset()

      // Add test objects
      const cr1 = await db.indexablePeople.add(testPerson)
      const cr2 = await db.indexablePeople.add(testPerson2)
      if (!cr1.ok || !cr2.ok) throw Error("documents were not added to collection successfully")

      // Check that test objects can be found by id and index before delete
      const idDoc1_1 = await db.indexablePeople.find(cr1.id)
      assert(idDoc1_1 !== null)

      const indexDoc1_1 = await db.indexablePeople.findByIndex({
        name: testPerson.name
      })
      assert(indexDoc1_1 !== null)

      const idDoc2_1 = await db.indexablePeople.find(cr2.id)
      assert(idDoc2_1 !== null)

      const indexDoc2_1 = await db.indexablePeople.findByIndex({
        name: testPerson2.name
      })
      assert(indexDoc2_1 !== null)

      // Delete test objects
      await db.indexablePeople.deleteMany({
        filter: doc => doc.value.name === testPerson.name
      })

      // Check that filtered test objects can not be found by id and index after delete, while un-fitlered can be found
      const idDoc1_2 = await db.indexablePeople.find(cr1.id)
      assert(idDoc1_2 === null)

      const indexDoc1_2 = await db.indexablePeople.findByIndex({
        name: testPerson.name
      })
      assert(indexDoc1_2 === null)

      const idDoc2_2 = await db.indexablePeople.find(cr2.id)
      assert(idDoc2_2 !== null)

      const indexDoc2_2 = await db.indexablePeople.findByIndex({
        name: testPerson2.name
      })
      assert(indexDoc2_2 !== null)
    })
  })
})