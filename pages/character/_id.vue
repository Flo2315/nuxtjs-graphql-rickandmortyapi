<template>
  <div class="container m-auto mt-8 page-transition px-2">
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
    <EpisodesTable :episodes="character.episode" />
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
}
</script>
