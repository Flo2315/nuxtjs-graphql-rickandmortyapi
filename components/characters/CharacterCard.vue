<template>
  <div class="max-w-sm w-full lg:max-w-full lg:flex max-h-full">
    <div
      class="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
      :style="`background-image: url('${character.image}')`"
      :title="character.name"
    ></div>
    <div
      class="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col flex-grow justify-between leading-normal"
    >
      <div class="mb-8">
        <p class="text-sm text-gray-600 flex items-center">
          {{ character.species }} - {{ character.gender }} -
          {{ character.status }}
        </p>
        <div class="text-gray-900 font-bold text-xl mb-2">
          {{ character.name }}
        </div>
        <p class="text-gray-700 text-xs">
          {{ character.location.type }}
          {{ character.location.name }}
        </p>
        <p class="text-gray-700 text-xs">
          {{ character.origin.type }}
          {{ character.origin.name }}
        </p>
      </div>
      <nuxt-link
        v-if="linkMore"
        :to="`/character/${character.id}`"
        class="text-teal-600 text-sm"
      >
        More informations
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CharacterCard',
  props: {
    character: {
      type: Object,
      default: () => {
        return {}
      },
    },
    linkMore: {
      type: Boolean,
      default: true,
    },
  },
}
</script>
