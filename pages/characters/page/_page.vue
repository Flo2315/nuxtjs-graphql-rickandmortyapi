<template>
  <div class="container m-auto mt-8 page-transition px-2">
    <div class="text-center mb-6">
      <h3
        class="text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10"
      >
        List of characters
      </h3>
    </div>
    <div class="grid grid-flow-row-dense md:grid-cols-3 grid-cols-2 gap-4">
      <template v-for="character in characters.results">
        <CharacterCard :key="character.id" :character="character" />
      </template>
    </div>

    <pagination
      :info="characters.info"
      :characters-number-in-page="characters.results.length"
    />
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  transition(to, from) {
    if (!from) {
      return 'slide-left'
    }
    return +to.params.page < +from.params.page ? 'slide-right' : 'slide-left'
  },
  async asyncData({ app, params }) {
    const result = await app.apolloProvider.defaultClient.query({
      query: gql`
        query getCharacters($page: Int) {
          characters(page: $page) {
            info {
              pages
              count
              next
              prev
            }
            results {
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
            }
          }
        }
      `,
      variables: {
        page: parseInt(params.page),
      },
    })

    return result.data
  },
}
</script>
