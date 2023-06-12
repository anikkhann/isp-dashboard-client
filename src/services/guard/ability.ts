import { AbilityBuilder, createMongoAbility } from "@casl/ability";
import { defineAbility } from "@casl/ability";

export function createAbility() {
  const ability = new AbilityBuilder(createMongoAbility);

  return ability;
}

export default defineAbility(can => {
  can([], "");
});
