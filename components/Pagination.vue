<template>
  <div
    class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 mt-8"
  >
    <div class="flex-1 flex justify-between sm:hidden">
      <nuxt-link
        v-if="info.prev"
        :to="`${baseUrl}/${info.prev}`"
        class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
      >
        Previous
      </nuxt-link>
      <nuxt-link
        v-if="info.next"
        :to="`${baseUrl}/${info.next}`"
        class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
      >
        Next
      </nuxt-link>
    </div>
    <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
      <div>
        <p class="text-sm leading-5 text-gray-700">
          Page {{ $route.params.page }}/{{ info.pages }} - Showing
          <span class="font-medium">{{ eltMin }}</span>
          to
          <span class="font-medium">{{ eltMax }}</span>
          of
          <span class="font-medium">{{ info.count }}</span>
          results
        </p>
      </div>
      <div>
        <nav class="relative z-0 inline-flex shadow-sm">
          <nuxt-link
            v-if="info.prev"
            :to="`${baseUrl}/${info.prev}`"
            class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
            aria-label="Previous"
          >
            <svg
              class="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
            Previous
          </nuxt-link>

          <nuxt-link
            v-for="number in [1, 2, 3]"
            :key="`page-${number}`"
            active-class=""
            :to="`${baseUrl}/${number}`"
            class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
          >
            {{ number }}
          </nuxt-link>
          <span
            class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700"
          >
            ...
          </span>
          <nuxt-link
            v-for="number in [info.pages - 2, info.pages - 1, info.pages]"
            :key="`page-${number}`"
            :to="`${baseUrl}/${number}`"
            active-class=""
            class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
          >
            {{ number }}
          </nuxt-link>

          <nuxt-link
            v-if="info.next"
            :to="`${baseUrl}/${info.next}`"
            :disabled="true"
            class="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
            aria-label="Next"
          >
            <svg
              class="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
            Next
          </nuxt-link>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    info: {
      type: Object,
      required: true,
      default: () => {
        return {}
      },
    },
    charactersNumberInPage: {
      type: Number,
      required: true,
    },
    baseUrl: {
      type: String,
      default: '/characters/page',
    },
  },
  computed: {
    eltMin() {
      if (this.$route.params.page === 1) return 1
      return (this.$route.params.page - 1) * 20 + 1
    },
    eltMax() {
      return this.eltMin - 1 + this.charactersNumberInPage
    },
  },
}
</script>
