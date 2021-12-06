<template>
    <div class="world-datamap-wrap">
    <vue-datamaps
        :geographyConfig="sGeographyConfig"
        :fills="sFills"
        bubbles
        :bubblesConfig="pCoordinate ? cBubbleConfig : {}"
        @custom:popup-bubble="popupTemplate"
        :localData="sWorld"
    >
    </vue-datamaps>
  </div>
</template>

<script>
import { VueDatamaps } from 'vue-datamaps'
import { world } from '~/assets/worldmap/index'

export default {
    components: {
        VueDatamaps
    },
    props: {
        pCoordinate: {
            type: Object,
            default: () => {}
        },
    },
    data () {
        return {
            sWorld: world,
            sGeographyConfig: {
                popupOnHover: false,
                highlightOnHover: false,
                borderWidth: 0,
            },
            sFills: {
                defaultFill: "#ccc",
                bubbleColor: "#dd4f40",
                borderWidth: 0,
            },
        }
    },
    computed: {
        cBubbleConfig() {
            const sBubbleInfo = {
                ...this.pCoordinate,
                radius: 10,
                fillOpacity: 0.5,
                fillKey: "bubbleColor",
            }

            if (this.pCoordinate.region === "USW1") {
                delete sBubbleInfo.region;
                sBubbleInfo.latitude = 37.338;
                sBubbleInfo.longitude = -121.8;
            }

            return {
                data: [sBubbleInfo],
                borderWidth: 0,
            }
        },
    },
    methods: {
        popupTemplate ({ aEvent }) {
        
        },
    },
}
</script>


<style lang="scss" scoped>
.world-datamap {
    &-wrap {
        width: 70%;
        height: 100%;

        .map {
            padding-top: 45%;
        }
    }
}
</style>