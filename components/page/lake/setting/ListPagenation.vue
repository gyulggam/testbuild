<template>
    <div
        v-if="cTotalList > 0"
        class="pagenation d-flex-align-center"
    >
        <span class="semi-title">
            {{ cShowListStart }} - {{ cShowListEnd }} of {{ cTotalList }}
        </span>
        <div class="pagenation-arrow-box d-flex-spacebetween d-flex-align-center">
            <i class="fas fa-angle-left arrow-icon mr-30 ml-10" @click="() => handlePagenation('subtract')"></i>
            <i class="fas fa-angle-right arrow-icon" @click="() => handlePagenation('add')"></i>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
    props: {
        pTotalCount: {
            type: Number,
            default: 0
        },
        pIsCheckAddListbtn: {
            type: Boolean,
            default: false,
        }
    },
    watch: {
        pTotalCount(aNewVal) {
            // 리스트가 변화가 일어났을때 emit로 start end 반환
            aNewVal && this.$emit('ePagenation', {"start": this.cShowListStart, "end": this.cShowListEnd});
        },
        pIsCheckAddListbtn(aNewVal) {
            //addList를 했을때 1-5 보다 높은 페이지라면 초기 페이지로 가기위한 초기화
            if (aNewVal) {
                this.sShowListStart = 1;
                this.sShowListEnd = 5;
            }
        },
    },
    computed: {
        ...mapState('setting', ['gCheckClickAddListBtn', "gPageGapCount"]),
        cTotalList() {
            return this.pTotalCount;
        },
        cShowListStart() {
            return this.sShowListStart; // pagenation start가 0이면 1로 표시
        },
        cShowListEnd() {
            let sResult = 0;

            if (this.sShowListEnd >= this.cTotalList) { // pagenation end를 숫자가 전체 리스트 보다 크다면 전체 리스트 개수 표시
                sResult = this.cTotalList;
            } else {
                sResult = this.sShowListEnd;
            }

            return sResult;
        }
    },
    methods: {
        ...mapMutations('setting',['setCheckClickAddListBtn']),
        handlePagenation(aType) {
            if (aType === 'add' && this.sShowListEnd < this.cTotalList) {
                this.sShowListStart = this.cShowListStart + this.gPageGapCount;
                this.sShowListEnd = this.sShowListEnd + this.gPageGapCount;
            } else if (aType === 'subtract' && this.sShowListEnd > this.gPageGapCount) {
                this.sShowListStart = this.cShowListStart - this.gPageGapCount;
                this.sShowListEnd = this.sShowListEnd - this.gPageGapCount;
            }

            this.$emit('ePagenation', {"start": this.cShowListStart, "end": this.cShowListEnd})
        }
    },
    mounted() {
        this.$emit('ePagenation', {"start": this.cShowListStart, "end": this.cShowListEnd});
    },
    updated() {
        // 해당하는 page에서 모든리스트가 삭제 되었을대 한페이징 뒤로가기 위한 루틴
        if (this.cShowListStart > 1 && this.cShowListStart > this.cShowListEnd) {
            this.sShowListStart = this.cShowListStart - this.gPageGapCount;

            this.$emit('ePagenation', {"start": this.cShowListStart, "end": this.cShowListEnd});
        }
    },
    data() {
        return {
            sShowListStart: 1,
            sShowListEnd: 5,
        }
    }
}
</script>

<style lang="scss">
@import "~/assets/scss/common/pagenation.scss";
</style>