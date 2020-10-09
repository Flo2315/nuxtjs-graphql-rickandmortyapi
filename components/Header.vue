<template>
  <nav class="bg-gray-800">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <button
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white transition duration-150 ease-in-out"
            aria-label="Main menu"
            aria-expanded="false"
            @click="mobileOpen = !mobileOpen"
          >
            <svg
              class="block h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <svg
              class="hidden h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div
          class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start"
        >
          <div class="flex-shrink-0">
            <img
              class="block h-8 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-on-dark.svg"
              alt="Workflow logo"
            />
          </div>
          <div class="hidden sm:block sm:ml-6">
            <div class="flex">
              <nuxt-link
                to="/"
                exact
                class="px-3 py-2 rounded-md text-sm font-medium leading-5 text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none transition duration-150 ease-in-out"
              >
                Dashboard
              </nuxt-link>
              <nuxt-link
                to="/characters"
                class="ml-4 px-3 py-2 rounded-md text-sm font-medium leading-5 text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none transition duration-150 ease-in-out"
              >
                Characters
              </nuxt-link>
              <nuxt-link
                to="/episodes"
                class="ml-4 px-3 py-2 rounded-md text-sm font-medium leading-5 text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none transition duration-150 ease-in-out"
              >
                Episodes
              </nuxt-link>
            </div>
          </div>
        </div>
        <div
          class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
        >
          <!-- Profile dropdown -->
          <div class="ml-3 relative">
            <div>
              <a
                href="https://florianleheurte.com/"
                target="blank"
                title="Florian Le Heurte"
                class="flex text-sm border-2 border-solid rounded-full focus:outline-none focus:border-white transition duration-150 ease-in-out"
                aria-label="User menu"
                aria-haspopup="true"
              >
                <img
                  class="h-8 w-8 rounded-full"
                  src="~/assets/profile.jpg"
                  alt=""
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="sm:hidden" :class="{ block: mobileOpen, hidden: !mobileOpen }">
      <div class="px-2 pt-2 pb-3">
        <nuxt-link
          to="/"
          exact
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
        >
          Dashboard
        </nuxt-link>
        <nuxt-link
          to="/characters"
          class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
        >
          Characters
        </nuxt-link>
        <nuxt-link
          to="/episodes"
          class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
        >
          Episodes
        </nuxt-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      mobileOpen: false,
    }
  },
}
</script>
