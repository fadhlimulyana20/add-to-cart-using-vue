<script setup lang="ts">
interface IProps {
    size?: 'text-sm' | 'text-md' | 'text-lg' | 'text-xl' | 'text-2xl' | 'text-3xl' | 'text-4xl' | 'text-5xl' | 'text-6xl'
    fontWeight?: 'font-regular' | 'font-medium' | 'font-bold'
}

const props = withDefaults(defineProps<IProps>(), {
    size: 'text-3xl',
    fontWeight: 'font-bold'
})

</script>

<template>
    <h5 
        :class="[props.size, props.fontWeight]"
    >
        <slot></slot>
    </h5>
</template>
