<template>
  <div class="page-transition">
    <div class="relative bg-white overflow-hidden">
      <div class="max-w-screen-xl mx-auto">
        <div
          class="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32"
        >
          <svg
            class="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>

          <div class="relative pt-6 px-4 sm:px-6 lg:px-8"></div>

          <main
            class="mt-10 mx-auto max-w-screen-xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28"
          >
            <div class="sm:text-center lg:text-left">
              <h2
                class="text-4xl tracking-tight leading-10 font-extrabold text-gray-900 sm:text-5xl sm:leading-none md:text-6xl"
              >
                Rick and morty - Explore API
                <br />
                <span class="text-4xl text-teal-600">Nuxt.js - GraphQL</span>
              </h2>
              <p
                class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
              >
                This project uses data from the GraphQL API
                <a
                  href="https://rickandmortyapi.com/graphql/"
                  target="blank"
                  class="text-teal-600"
                  >rickandmortyapi</a
                >
              </p>
              <div>
                <multiselect
                  v-model="selectedCharacter"
                  label="name"
                  track-by="name"
                  placeholder="Search a character"
                  open-direction="bottom"
                  :options="optionsCharacters"
                  :loading="isLoading"
                  :searchable="true"
                  :internal-search="false"
                  :clear-on-select="true"
                  :close-on-select="true"
                  :max-height="300"
                  :hide-selected="true"
                  :show-no-results="true"
                  class="mt-10"
                  @search-change="asyncFind"
                  @select="redirect"
                >
                  <template slot="option" slot-scope="props"
                    ><img
                      class="option__image inline-block"
                      :src="props.option.image"
                      alt="No Man’s Sky"
                      width="50"
                    />
                    <div class="option__desc inline-block">
                      <span class="option__title">{{ props.option.name }}</span>
                    </div>
                  </template>
                  <span slot="noOptions">
                    List is empty, typing for search...
                  </span>
                  <span slot="noResult"
                    >Oops! No elements found. Consider changing the search
                    query.</span
                  >
                </multiselect>
              </div>
              <p
                class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
              >
                Use the select above by typing the name of the character that
                you want to search.
                <br />
                You can explore the other pages with the menu at the top to
                discover all the characters of Ricky and Morty as well as the
                episodes
              </p>
              <p
                class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0 text-center"
              >
                <a
                  href="https://github.com/Flo2315"
                  target="blank"
                  class="text-teal-600"
                  >GitHub</a
                >
              </p>
              <div
                class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start lg:h-32"
              ></div>
            </div>
          </main>
        </div>
      </div>
      <div class="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          class="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          src="https://media.wired.com/photos/5955ba875992c54331ac1808/master/w_1164,c_limit/RickAndMorty.jpg"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import Multiselect from 'vue-multiselect'

export default {
  transition(to, from) {
    if (!from) {
      return 'slide-left'
    }
    return +to.params.page < +from.params.page ? 'slide-right' : 'slide-left'
  },
  components: { Multiselect },
  data() {
    return {
      selectedCharacter: null,
      optionsCharacters: [],
      isLoading: false,
    }
  },
  methods: {
    async asyncFind(query) {
      if (query.length === 0) {
        this.optionsCharacters = []
        return
      }

      this.isLoading = true
      const result = await this.$apollo
        .query({
          query: gql`
            query getCharacters($filter: FilterCharacter) {
              characters(filter: $filter) {
                results {
                  id
                  name
                  image
                }
              }
            }
          `,
          variables: {
            filter: { name: query },
          },
        })
        .catch((e) => {
          this.isLoading = false
          this.optionsCharacters = []
        })

      if (result) this.optionsCharacters = result.data.characters.results
      this.isLoading = false
    },
    redirect(selectedOption) {
      this.$router.push(`/character/${selectedOption.id}`)
    },
  },
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
