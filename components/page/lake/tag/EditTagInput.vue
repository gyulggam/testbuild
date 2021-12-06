<template>
    <div>
        <input class="input-tag-table" v-model="pRow['column.field']" @change="$emit('eEmitTest')" />
    </div>
</template>

<script>
export default {
    props: {
        pRow: Object,
        pColumn: Object,
        pRowIndex: Number,
    },
}
</script>
