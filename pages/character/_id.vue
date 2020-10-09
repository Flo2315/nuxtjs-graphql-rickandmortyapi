<template>
  <div class="container m-auto mt-8 transition">
    <div class="text-center mb-6">
      <h3
        class="text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10"
      >
        Character detail
      </h3>
    </div>
    <div class="flex items-center items-stretch mb-8">
      <div class="w-1/2 mr-1">
        <CharacterCard :character="character" :link-more="false" />
      </div>
      <div
        class="w-1/2 ml-1 text-center border-t border-r border-b border-l border-gray-400 bg-white rounded-b rounded-r rounded-l flex"
      >
        <div class="m-auto">
          <p class="text-base">Participate in</p>
          <p class="text-6xl leading-tight">{{ character.episode.length }}</p>
          <p class="text-base">
            {{ character.episode.length > 1 ? 'episodes' : 'episode' }}
          </p>
        </div>
      </div>
    </div>
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
                    class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                  >
                    date
                  </th>
                  <th
                    class="hidden md:block px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Other characters
                  </th>
                  <th class="px-6 py-3 bg-gray-50"></th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="episode in character.episode" :key="episode.id">
                  <td class="px-6 py-4 whitespace-no-wrap">
                    <div class="flex items-center">
                      <div>
                        <div
                          class="text-sm leading-5 font-medium text-gray-900"
                        >
                          {{ episode.name }}
                        </div>
                        <div class="text-sm leading-5 text-gray-500">
                          {{ episode.episode }}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-no-wrap">
                    <div class="text-sm leading-5 text-gray-900">
                      {{ episode.air_date }}
                    </div>
                  </td>
                  <td class="hidden md:block px-6 py-4 whitespace-no-wrap">
                    <div class="flex overflow-hidden">
                      <nuxt-link
                        v-for="(character, index) in lastCharacters(
                          episode.characters
                        )"
                        :key="character.id"
                        :to="`/character/${character.id}`"
                        :class="{ '-ml-1': index > 0 }"
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
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  transition(to, from) {
    if (!from) {
      return 'slide-left'
    }
    return +to.params.id < +from.params.id ? 'slide-right' : 'slide-left'
  },
  async asyncData({ app, params }) {
    const result = await app.apolloProvider.defaultClient.query({
      query: gql`
        query getCharacter($id: ID!) {
          character(id: $id) {
            id
            name
            image
            status
            species
            gender
            type
            created
            origin {
              name
              type
            }
            location {
              name
              type
            }
            episode {
              id
              name
              episode
              air_date
              characters {
                id
                name
                image
              }
            }
          }
        }
      `,
      variables: {
        id: params.id,
      },
    })

    return result.data
  },
  methods: {
    lastCharacters(characters) {
      return characters.slice(0, 20)
    },
  },
}
</script>
