<template>
  <div class="container m-auto mt-8 page-transition px-2">
    <div class="text-center mb-6">
      <h3
        class="text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10"
      >
        List of episodes
      </h3>
    </div>

    <EpisodesTable :episodes="episodes.results" />

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
