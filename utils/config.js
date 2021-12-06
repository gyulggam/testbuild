export const TYPE_LIST = {
    int: ['short', 'ushort', 'integer', 'uinterger', 'long', 'ulong'],
    float: ['float', 'double']
}

export const TYPE_COLUMN = [{
        value: 'short',
        name: 'short'
    },
    {
        value: 'ushort',
        name: 'ushort'
    },
    {
        value: 'integer',
        name: 'integer'
    },
    {
        value: 'uinteger',
        name: 'uinteger'
    },
    {
        value: 'long',
        name: 'long'
    },
    {
        value: 'ulong',
        name: 'ulong'
    },
    {
        value: 'float',
        name: 'float'
    },
    {
        value: 'double',
        name: 'double'
    },
    {
        value: 'datetime',
        name: 'datetime'
    },
    {
        value: 'varchar',
        name: 'varchar'
    },
    {
        value: 'ipv4',
        name: 'ipv4'
    },
    {
        value: 'ipv6',
        name: 'ipv6'
    }
]

export const LAKE_REGION_LIST = [
    {
        index: 1,
        region_name: 'US-EAST-1 (Virginia)',
        region_value: 'USE1',
    },
    {
        index: 2,
        region_name: 'US-EAST-2 (Ohio)',
        region_value: 'CAN1',
    },
    {
        index: 3,
        region_name: 'US-WEST-1 (California)',
        region_value: 'USW1',
    },
    {
        index: 4,
        region_name: 'US-WEST-2 (Oregon)',
        region_value: 'USW2',
    },
    {
        index: 5,
        region_name: 'AP-NORTHEAST-2 (Seoul)',
        region_value: 'APN2',
    },
    {
        index: 6,
        region_name: 'AP-NORTHEAST-1 (Tokyo)',
        region_value: 'APN1',
    },
]
export const LAKE_ACCESS_CONTOL_HEADER = [
    {
        index: 0,
        col_name: 'Name',
        col_id: 'name',
        width: 30
    },
    {
        index: 1,
        col_name: 'Cidr',
        col_id: 'ip',
        width: 30
    },
    {
        index: 2,
        col_name: '',
        col_id: 'remove-ip',
        width: 10
    },
]
export const LAKE_META_HEADER = [
    {
        index: 0,
        col_name: 'Additional Column',
        col_id: 'additional-column',
        width: 40
    },
    {
        index: 1,
        col_name: '',
        col_id: 'type',
        width: 30
    },
    {
        index: 2,
        col_name: 'Length',
        col_id: 'length',
        width: 10
    },
    {
        index: 3,
        col_name: '',
        col_id: 'remove',
        width: 9
    },
]

//profile menu 설정
export const PROFILE_SIDE_MENU = [
    {
        index: 1,
        menu_name: "Profile",
        categories: "main",
        link: "profile",
    },
    // {
    //     index: 2,
    //     menu_name: "Payment",
    //     categories: "main",
    //     link: "Payment",
    // },
]

//CREATE SETTING Side menu 설정
export const SETTING_SIDE_MENU = [
    {
        index: 1,
        menu_name: "Lake name",
        categories: "main",
        link: "setLakename",
    },
    {
        index: 2,
        menu_name: "Default timezone",
        categories: "main",
        link: "setTimezone",
    },
    {
        index: 3,
        menu_name: "Access control",
        categories: "detail",
        link: "setAccess",
    },
    {
        index: 4,
        menu_name: "Plan",
        categories: "detail",
        link: "setPlan",
    },
]

export const CREATELAKE_SIDE_MENU = [
    {
        index: 1,
        menu_name: "Lake name",
        categories: "main",
        link: "setLakename",
    },
    {
        index: 2,
        menu_name: "Plan",
        categories: "main",
        link: "setPlan",
    },
    {
        index: 3,
        menu_name: "Tag meta",
        categories: "main",
        link: "setTag",
    },
    {
        index: 4,
        menu_name: "Value",
        categories: "main",
        link: "setValue",
    },
    {
        index: 5,
        menu_name: "Lake region",
        categories: "submenu",
        link: "setRegion",
    },
    {
        index: 6,
        menu_name: "Default timezone",
        categories: "submenu",
        link: "setTimezone",
    },
    // {
    //     index: 7,
    //     menu_name: "Access control",
    //     categories: "submenu",
    //     link: "setAccess",
    // }
]
//CREATE SETTING Side menu 설정

//tagmeta value schema 초기값
export const DEFAULT_TAGMETA_SCHEMA = [
    {
        "col_name": "name",
        "col_type": "varchar",
        "col_length": 80
    }
]

export const DEFAULT_VALUE_SCHEMA = [
    {
        "col_name": 'time',
        "col_type": "datetime",
        "col_length": 0
    },
    {
        "col_name": 'value',
        "col_type": "double",
        "col_length": 0
    }
]
//tagmeta value schema 초기값

export const DEFAUlT_LAKEINFO = {
    lake_name: "",
    lake_plan: "basic",
    region: "",
    timezone: "",
}