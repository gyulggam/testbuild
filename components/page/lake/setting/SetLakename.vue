<template>
     <div class="lakename-wrap">
        <span class="section-card-title">Lake name</span>
        <div class="section-card d-flex w-100">
            <div class="lakename-box d-flex-spacebetween d-flex-align-center w-70">
                <div class="lakename-imgbox d-flex-center">
                    <img src="~/assets/images/icon_lake.png" alt="" />
                </div>
                <input
                    type="text"
                    class="section-card-input"
                    :class="{
                        'input-border-success': sIsCheckSetName,
                        'input-border-validity': sHint
                    }"
                    :value="sEditLakeName"
                    @input="aEvent => handleChangeLakeName(aEvent)"
                >
                <CheckBoxBtn
                    :pStatus="sIsCheckSetName"
                    :pFunction="handleClickCheckBtn"
                />
            </div>
            <div class="lakename-hint-box d-flex-align-center w-20 ml-20">
                <span class="semi-hint"> {{ sHint }}</span>
            </div>
        </div> 
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
import CheckBoxBtn from '~/components/common/CheckBoxBtn'

export default {
    components: {
        CheckBoxBtn
    },
    props: {
        pLakeInfo: {
            type: Object,
            require: true,
        }
    },
    data() {
        return {
            sEditLakeName: "",
            sInitLakeName: "",
            sHint: "",
            sIsCheckSetName: false,
        }
    },
    computed: {
        ...mapState('lake', ["gLakeList"]),
        ...mapState('global', ["gCurrentPage"]),
        cLakeList() {
            return this.gLakeList && this.gLakeList.lake;
        }
    },
    methods: {
        ...mapActions('lake', ['updateLake']),
        handleClickCheckBtn() {
            /* 
                name이 정상적으로 체크되어 부모 컴포넌트로 보내기 위한 함수 체크하는 루틴 필요 (중복, 특수문자 등등 체크) 
                setting일때는 바로 업데이트 날림
            */
            this.checkValidityLakeName();

            if (this.sHint !== "") return;

            this.sIsCheckSetName = !this.sIsCheckSetName;
            this.$emit("eSetLakeName", this.sIsCheckSetName ? this.sEditLakeName : null);
        },
        handleChangeLakeName(aEvent) {
            //name이 입력되어 수정될때 sIsCheckSetName false 처리
            this.sEditLakeName = aEvent.target.value;
            this.sIsCheckSetName = false;
        },
        checkValidityLakeName() {
            /* 
                1. input null check
                2. 리스트에 해당 요소가 있는지 체크하면 있다면 true 없으면 false 반환
                setting 페이지라면 현재 자신의 lake info를 list에서 제외 하고 중복을 찾는다.
                3.name에 특수문자 제한
            */
            const sRulePattern = /^[a-zA-Z0-9_-]*$/;
            const sList = this.gCurrentPage === "setting" ?
                this.cLakeList.filter(aItem => {
                    return aItem.lake_info.lake_name !== this.sInitLakeName;
                }) : this.cLakeList;

            const sIsCheckLakeNameOverlap = sList.some(aItem => {
                return aItem.lake_info.lake_name.toUpperCase() === this.sEditLakeName.toUpperCase();
            });

            if (this.sEditLakeName === "") {
                this.sHint = "Please enter lake name";
            } else if (!this.sEditLakeName.match(sRulePattern)) {
                this.sHint = "Special characters cannot be used";
            } else if (sIsCheckLakeNameOverlap) {
                this.sHint = "Please duplicate check lake name";
            } else {
                this.sHint = "";
            }
        }
    },
    async created() {
        this.sEditLakeName = this.pLakeInfo.lake_name;
        this.sInitLakeName = this.pLakeInfo.lake_name;
    }
}
</script>

<style lang="scss">
@import "~/assets/scss/components/lake/_lake-name.scss";
</style>