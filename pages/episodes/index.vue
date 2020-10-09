<template>
  <div class="container m-auto mt-8 transition">
    <div class="text-center mb-6">
      <h3
        class="text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10"
      >
        List of episodes
      </h3>
    </div>
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
        <tr v-for="episode in episodes.results" :key="episode.id">
          <td class="px-6 py-4 whitespace-no-wrap">
            <div class="flex items-center">
              <div>
                <div class="text-sm leading-5 font-medium text-gray-900">
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
                v-for="(character, index) in lastCharacters(episode.characters)"
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
    <client-only>
      <infinite-loading
        spinner="spiral"
        @infinite="infiniteScroll"
      ></infinite-loading>
    </client-only>
  </div>
</template>

<script>
import gql from 'graphql-tag'

const query = gql`
  query getEpisode($page: Int) {
    episodes(page: $page) {
      info {
        pages
        count
        next
        prev
      }
      results {
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
`

export default {
  transition(to, from) {
    if (!from) {
      return 'slide-left'
    }
    return +to.params.page < +from.params.page ? 'slide-right' : 'slide-left'
  },
  async asyncData({ app, params }) {
    const page = 1
    const result = await app.apolloProvider.defaultClient.query({
      query,
      variables: {
        page: parseInt(page),
      },
    })

    const { episodes } = result.data
    return {
      episodes,
      page,
    }
  },
  methods: {
    lastCharacters(characters) {
      return characters.slice(0, 20)
    },
    infiniteScroll($state) {
      setTimeout(async () => {
        this.page++
        if (this.page <= this.episodes.info.pages) {
          const result = await this.$apollo.query({
            query,
            variables: {
              page: this.page,
            },
          })

          const { results } = result.data.episodes
          if (results.length > 0) {
            results.forEach((item) => this.episodes.results.push(item))
            $state.loaded()
          } else {
            $state.complete()
          }
        } else {
          $state.complete()
        }
      }, 500)
    },
  },
}
</script>