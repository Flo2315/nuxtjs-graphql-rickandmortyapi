<template>
  <div class="flex flex-col mb-8">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div
          class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
        >
          <table class="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th
                  class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  class="hidden md:table-cell px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                >
                  date
                </th>
                <th
                  class="hidden lg:table-cell px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                >
                  Other characters
                </th>
                <th class="px-6 py-3 bg-gray-50"></th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="episode in episodes" :key="episode.id">
                <td class="px-6 py-4 whitespace-no-wrap">
                  <div class="flex items-center">
                    <div>
                      <div class="text-sm leading-5 font-medium text-gray-900">
                        {{ episode.name }}
                      </div>
                      <div class="text-sm leading-5 text-gray-500">
                        {{ episode.episode }}
                      </div>
                      <div
                        class="md:hidden text-sm leading-5 font-medium text-gray-900 italic"
                      >
                        {{ episode.air_date }}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="hidden md:table-cell px-6 py-4 whitespace-no-wrap">
                  <div class="text-sm leading-5 text-gray-900">
                    {{ episode.air_date }}
                  </div>
                </td>
                <td class="hidden lg:table-cell px-6 py-4 whitespace-no-wrap">
                  <div class="flex overflow-hidden">
                    <nuxt-link
                      v-for="(character, index) in lastCharacters(
                        episode.characters
                      )"
                      :key="character.id"
                      :to="`/character/${character.id}`"
                      :class="{ '-ml-1': index > 0 }"
                      active-class=""
                    >
                      <img
                        class="inline-block h-8 w-8 rounded-full text-white shadow-solid"
                        :src="character.image"
                        :alt="character.name"
                        :title="character.name"
                        width="32"
                        height="32"
                      />
                    </nuxt-link>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EpisodesTable',
  props: {
    episodes: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  methods: {
    lastCharacters(characters) {
      return characters.slice(0, 20)
    },
  },
}
</script>
