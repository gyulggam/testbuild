<template>
    <div class="access-wrap">
        <span class="section-card-title">Access control</span>
        <div class="section-card d-flex w-100">
            <ItemLoading v-if="sIsShowAclLoading" />

            <div
                v-if="sIsCheckAllowAllCidr"
                class="access-toggle-box d-flex-column d-flex-center d-flex-align-center w-100"
            >
                <span class="mb-10">Allow all Cidr</span>
            </div>

            <div
                v-else
                class="access-box d-flex-column w-100"
            >
                <div class="access-header d-flex-spacebetween w-100 mb-40">
                    <div class="access-add-ip d-flex-spacebetween d-flex-align-center w-20">
                        <!-- <span 
                            class="semi-title cursor-pointer"
                            @click="() => handleAddWhiteList('default', '0.0.0.0/0')"
                        >
                            <i class="far fa-plus"></i> New
                        </span> -->
                        <span 
                            class="semi-title cursor-pointer"
                            @click="() => handleAddWhiteList('MYIP', `${sClientId.data.ip}/32`)"
                        >
                            <i class="far fa-plus positive-color"></i> My IP
                        </span>

                        <!-- <toggle-button
                            :color="{checked: '#6ad98d', unchecked: '#ec7676'}"
                            :sync="true"
                            :labels="true"
                            v-model="sIsCheckAllowAllCidr"
                            @click="sIsCheckAllowAllCidr = !sIsCheckAllowAllCidr"
                        /> -->
                    </div>


                    <ListPagenation
                        :pTotalCount="sWhiteList.length"
                        :pIsCheckAddListbtn="sIsCheckSetAclList"
                        @ePagenation="setPagenationRange"
                    />
                </div>

                <div class="access-content w-100">
                    <div class="access-content-list d-flex-column">
                        <div class="access-content-list-header">
                            <div
                                v-for="(aItem, aIdx) in sAccessListHeader" :key="aIdx"
                            >
                                {{ aItem.col_name }}
                            </div>
                        </div>

                        <div
                            class="access-content-list-item mt-15 mb-10"
                        >
                            <input
                                type="text"
                                class="section-card-input"
                                :class="{
                                    'input-border-success': sAddAclName && !sAclNameHint,
                                    'input-border-validity': sAclNameHint
                                }"
                                v-model="sAddAclName"
                                ref="add_acl_name"
                                placeholder="default"
                                @blur="aEvent => handleCheckAclNameValidity()"
                                v-tooltip="{
                                    content: sAclNameHint,
                                    show: sAclNameHint,
                                    trigger: 'manual',
                                    placement: 'top',
                                }"
                            />
                            <input
                                type="text"
                                class="section-card-input"
                                :class="{
                                    'input-border-success': sAddAclCidr && !sAclCidrHint,
                                    'input-border-validity': sAclCidrHint
                                }"
                                v-model="sAddAclCidr"
                                ref="add_acl_cidr"
                                placeholder="0.0.0.0/0"
                                @blur="aEvent => handleCheckCidrValidity()"
                                v-tooltip="{
                                    content: sAclCidrHint,
                                    show: sAclCidrHint,
                                    trigger: 'manual',
                                    placement: 'top',
                                }"
                            />
                            <i
                                class="fas fa-plus-circle access-btn positive-color"
                                @click="() => handleAddWhiteList(sAddAclName, sAddAclCidr)"
                            >
                            </i>
                        </div>

                        <div
                            v-for="(aItem, aIdx) in cAclListRange" :key="aIdx"
                            class="access-content-list-item mt-15"
                        >
                            <div
                                v-if="sWhiteList.length > 0"
                                type="text"
                                class="section-card-item"
                            >
                               {{ sWhiteList[aIdx + sPagingStart].name }}
                            </div>

                            <div
                                v-if="sWhiteList.length > 0"
                                type="text"
                                class="section-card-item"
                            >
                                {{ sWhiteList[aIdx + sPagingStart].cidr }}
                            </div>

                            <i
                                v-if="sWhiteList.length > 0"
                                class="fas fa-minus-circle access-btn denial-color"
                                @click="() => handleDeleteWhiteList(aIdx)"
                            >
                            </i>
                        </div>

                        <!-- input version edit가 생기면 사용할수도 있음 -->
                        <!-- <div 
                            v-for="(aItem, aIdx) in cAclListRange" :key="aIdx"
                            class="access-content-list-item mt-15"
                        >
                            <input
                                type="text"
                                class="section-card-input"
                                ref="aclnameinput"
                                v-model="sWhiteList[aIdx + sPagingStart].name"
                                @blur="aEvent => handleCheckAclNameValidity(aEvent, aIdx)"
                            />
                            <input
                                type="text"
                                class="section-card-input"
                                ref="aclcidrinput"
                                v-model="sWhiteList[aIdx + sPagingStart].cidr"
                                @input="aEvent => handleCheckCidrValidity(aEvent, aIdx)"
                                @blur="aEvent => handleBlurCheckCidr(aEvent)"
                            />
                            <i
                                class="fas fa-minus-circle access-btn denial-color"
                                @click="() => handleDeleteWhiteList(aIdx)"
                            >
                            </i>
                        </div> -->

                        <!-- <div class="access-content-list-footer d-flex-center mt-40">
                            <CheckBoxBtn
                                :pStatus="sIsCheckSetAclList"
                                :pFunction="handleClickCheckBtn"
                            />
                        </div> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { mapState, mapMutations, mapActions } from 'vuex';
import { LAKE_ACCESS_CONTOL_HEADER } from '~/utils/config';
import ListPagenation from '~/components/page/lake/setting/ListPagenation';
import CheckBoxBtn from '~/components/common/CheckBoxBtn';
import CheckCidr from 'is-cidr'

export default {
    components: {
        ListPagenation,
        CheckBoxBtn,
    },
    props: {
        pLakeId: {
            type: String,
            default: ""
        },
        pLakeAclList: {
            type: Array,
            require: true,
            default: () => []
        }
    },
    data() {
        return {
            sAccessListHeader: LAKE_ACCESS_CONTOL_HEADER,
            sIsCheckSetAclList: false,
            sIsShowAclLoading: false,
            sIsCheckAllowAllCidr: false,
            sClientId: "",
            sAddAclName: "",
            sAddAclCidr: "",
            sAclNameHint: "",
            sAclCidrHint: "",
            sPagingStart: 0,
            sPagingEnd: 0,
            sWhiteList: [],
        }
    },
    computed: {
        ...mapState('lake', ["gLakeList"]),
        ...mapState('setting', ['gCheckClickAddListBtn']),
        cSettingLakeAclList() {
            return this.gLakeList && this.gLakeList.access_control_list;
        },
        cAclListRange() {
            return this.sPagingEnd - this.sPagingStart;
        },
    },
    methods: {
        ...mapMutations('setting',['setCheckClickAddListBtn']),
        ...mapActions('setting',[
                "createAcl", 
                "deleteAcl", 
                "updateAcl"
            ]
        ),
        ...mapActions('lake', [
                "viewLake",
            ]
        ),
        async getAclList() {
            const sResult = await this.viewLake(this.pLakeId);
            if (!sResult.hasOwnProperty("title")) {
                this.sWhiteList = sResult.access_control_list;
            }
        },
        async handleAddWhiteList(aName = "", aCidr = "") {
            this.sAddAclName = aName;
            this.sAddAclCidr = aCidr;

            this.handleCheckAclNameValidity();
            this.handleCheckCidrValidity();

            if (this.sAclNameHint || this.sAclCidrHint)  return;

            this.sIsShowAclLoading = true;

            const sPayload = {
                lake_id: this.pLakeId,
                acl_list: [
                    {
                        name: aName,
                        cidr: aCidr
                    }
                ]
            };

            const sResult = await this.createAcl(sPayload);
            if(sResult.status === "success") {
                this.sAddAclName = "";
                this.sAddAclCidr = "";
                this.$toasted.success(sResult.status);
                await this.getAclList();
            } else {
                this.$toasted.error("Faild add Acl");
            }

            this.sIsShowAclLoading = false;
            // this.sWhiteList.unshift(sDefaultWhiteList);
        },
        async handleDeleteWhiteList(aIdx) {
            if (this.sPagingEnd === this.sWhiteList.length && this.sWhiteList.length > 1) {
                this.sPagingEnd = this.sPagingEnd - 1;
            }

            this.sIsShowAclLoading = true;

            const sPayload = {
                lake_id: this.pLakeId,
                acl_obj: this.sWhiteList[aIdx]
            };

            const sResult = await this.deleteAcl(sPayload);
            if(sResult.status === "success") {
                this.$toasted.success(sResult.status);
                await this.getAclList();
            } else {
                this.$toasted.error(sResult.data.title);
            }

            this.sIsShowAclLoading = false;
        },
        handleCheckAclNameValidity() {
            this.sAclNameHint = !this.sAddAclName ? "Enter the Name" : "";

            if (!this.sAclNameHint) {
                this.sAclNameHint = this.sWhiteList.some((aItem) => {
                    return aItem.name === this.sAddAclName;
                }) ? "Check duplicate Acl Name" : "";
            }
        },
        handleCheckCidrValidity() {
            this.sAclCidrHint = !this.sAddAclCidr ? "Enter the Cidr" : "";

            if (!this.sAclCidrHint) {
                this.sAclCidrHint = this.sWhiteList.some((aItem) => {
                    return aItem.cidr === this.sAddAclCidr;
                }) ? "Check duplicate Acl Cidr" : "";
            }

            if (!this.sAclCidrHint) {
               this.sAclCidrHint = !CheckCidr(this.sAddAclCidr) ? "Check Cidr validity" : "";
            }
        },
        handleClickCheckBtn() {
            this.sIsCheckSetAclList = !this.sIsCheckSetAclList;
            this.$emit('eSetAclList', this.sWhiteList);
        },
        setPagenationRange(aRange = {"start": this.sPagingStart, "end": this.sPagingEnd}) {
            this.sPagingStart = aRange.start === 0 ? aRange.start : aRange.start - 1;
            this.sPagingEnd = aRange.end;
        },
    },
    async created() {
        this.sClientId = await axios.get('https://api.ipify.org?format=json');
        this.sWhiteList = this.pLakeAclList;
        this.setPagenationRange();
        this.$emit('eSetAclList', this.sWhiteList);
    },
    /*  handleBlurCheckCidr(aEvent) {
        // cidr 형식에 맞지않으면 인풋 보더 처리 이제 추가된 list는 수정이 안되도록 막아서 필요없음
        this.$refs.aclcidrinput.forEach(aItem => {
            if (aItem.value === aEvent.target.value && !CheckCidr(aEvent.target.value)) {
                aItem.style.border = this.sValidityBorderStyle.border;
                this.$toasted.error("It doesn't fit the format of the cidr");
            } else {
                aItem.style.border = "none";
                aItem.style["border-bottom"] = this.sDefaultBorderStyle.border;
            }
        });
    }, */
}
</script>

<style lang="scss">
@import "~/assets/scss/components/lake/_access-control.scss";
</style>