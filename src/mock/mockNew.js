exports.wbObj = {
    // 获取 dictNames 列表
    getDictNames() {
        let dictNames = []
        for (let dict in this) {
            if (typeof this[dict] != "function" && dict != 'compareIndexMap') {
                dictNames.push(dict);
            }
        }
        return dictNames;
    },
    "compareIndexMap": {
        "性别": {
            "model": 0,
            "城阳": 0,
            "市南区（sex）": 0,
            "即墨区(sex)": 0,
            "崂山区": 0,
            "市北区": 0,
            "李沧区": 0,
            "莱西": 0,
            "平度": 0,
            "胶州": 0,
            "西海岸": 0
        },
        "办证类型编码": {
            "model": 0,
            "城阳（办证类型）": 0,
            "市南区": 0,
            "即墨区(TYPE_OF_CERTIFICATION)": 0,
            "崂山区": 0,
            "市北区": 0,
            "李沧区": 0,
            "莱西": 0,
            "平度": 0,
            "胶州": 0,
            "西海岸": 0
        }
    },
    "性别": {
        "model": [
            {
                "rowId": 2,
                "cols": [
                    "value",
                    "code"
                ],
                "matches": {
                    "城阳": [
                        {
                            "similar": 1,
                            "bcName": "城阳",
                            "rowId": 2
                        },
                        {
                            "similar": 0,
                            "bcName": "城阳",
                            "rowId": 3
                        }
                    ],
                    "市南区（sex）": [
                        {
                            "similar": 1,
                            "bcName": "市南区（sex）",
                            "rowId": 2
                        }
                    ],
                    "即墨区(sex)": [
                        {
                            "similar": 1,
                            "bcName": "即墨区(sex)",
                            "rowId": 2
                        }
                    ],
                    "崂山区": [
                        {
                            "similar": 1,
                            "bcName": "崂山区",
                            "rowId": 2
                        }
                    ],
                    "市北区": [
                        {
                            "similar": 1,
                            "bcName": "市北区",
                            "rowId": 2
                        }
                    ],
                    "李沧区": [
                        {
                            "similar": 1,
                            "bcName": "李沧区",
                            "rowId": 2
                        }
                    ],
                    "莱西": [
                        {
                            "similar": 1,
                            "bcName": "莱西",
                            "rowId": 2
                        }
                    ],
                    "平度": [
                        {
                            "similar": 1,
                            "bcName": "平度",
                            "rowId": 2
                        }
                    ],
                    "胶州": [
                        {
                            "similar": 1,
                            "bcName": "胶州",
                            "rowId": 2
                        }
                    ],
                    "西海岸": [
                        {
                            "similar": 1,
                            "bcName": "西海岸",
                            "rowId": 2
                        }
                    ]
                },
                "pRowId": ""
            },
            {
                "rowId": 4,
                "cols": [
                    "未知的性别",
                    "0"
                ],
                "matches": {
                    "市南区（sex）": [
                        {
                            "similar": 1,
                            "bcName": "市南区（sex）",
                            "rowId": 4
                        }
                    ],
                    "即墨区(sex)": [
                        {
                            "similar": 1,
                            "bcName": "即墨区(sex)",
                            "rowId": 4
                        }
                    ]
                },
                "pRowId": ""
            },
            {
                "rowId": 5,
                "cols": [
                    "男",
                    "1"
                ],
                "matches": {
                    "市南区（sex）": [
                        {
                            "similar": 1,
                            "bcName": "市南区（sex）",
                            "rowId": 5
                        }
                    ],
                    "即墨区(sex)": [
                        {
                            "similar": 0.5,
                            "bcName": "即墨区(sex)",
                            "rowId": 5
                        }
                    ]
                },
                "pRowId": ""
            },
            {
                "rowId": 6,
                "cols": [
                    "女",
                    "2"
                ],
                "matches": {
                    "城阳": [
                        {
                            "similar": 1,
                            "bcName": "城阳",
                            "rowId": 6
                        },
                        {
                            "similar": 0,
                            "bcName": "城阳",
                            "rowId": 7
                        }
                    ],
                    "市南区（sex）": [
                        {
                            "similar": 1,
                            "bcName": "市南区（sex）",
                            "rowId": 6
                        }
                    ],
                    "即墨区(sex)": [
                        {
                            "similar": 0.5,
                            "bcName": "即墨区(sex)",
                            "rowId": 6
                        }
                    ]
                },
                "pRowId": ""
            },
            {
                "rowId": 8,
                "cols": [
                    "未说明的性别",
                    "9"
                ],
                "matches": {
                    "市南区（sex）": [
                        {
                            "similar": 1,
                            "bcName": "市南区（sex）",
                            "rowId": 8
                        }
                    ],
                    "即墨区(sex)": [
                        {
                            "similar": 1,
                            "bcName": "即墨区(sex)",
                            "rowId": 8
                        }
                    ]
                },
                "pRowId": ""
            }
        ],
        "城阳": [
            {
                "rowId": 2,
                "cols": [
                    "value",
                    "id",
                    "code"
                ],
                "matches": {},
                "pRowId": 2
            },
            {
                "rowId": 3,
                "cols": [
                    "男",
                    "",
                    "201"
                ],
                "matches": {},
                "pRowId": 2
            },
            {
                "rowId": 6,
                "cols": [
                    "女",
                    "",
                    "202"
                ],
                "matches": {},
                "pRowId": 6
            },
            {
                "rowId": 7,
                "cols": [
                    "未知",
                    "",
                    "203"
                ],
                "matches": {},
                "pRowId": 6
            }
        ],
        "市南区（sex）": [
            {
                "rowId": 2,
                "cols": [
                    "value",
                    "code"
                ],
                "matches": {},
                "pRowId": 2
            },
            {
                "rowId": 4,
                "cols": [
                    "未知的性别",
                    "0"
                ],
                "matches": {},
                "pRowId": 4
            },
            {
                "rowId": 5,
                "cols": [
                    "男",
                    "1"
                ],
                "matches": {},
                "pRowId": 5
            },
            {
                "rowId": 6,
                "cols": [
                    "女",
                    "2"
                ],
                "matches": {},
                "pRowId": 6
            },
            {
                "rowId": 8,
                "cols": [
                    "未说明的性别",
                    "9"
                ],
                "matches": {},
                "pRowId": 8
            }
        ],
        "即墨区(sex)": [
            {
                "rowId": 2,
                "cols": [
                    "value",
                    "code"
                ],
                "matches": {},
                "pRowId": 2
            },
            {
                "rowId": 4,
                "cols": [
                    "未知的性别",
                    "0"
                ],
                "matches": {},
                "pRowId": 4
            },
            {
                "rowId": 5,
                "cols": [
                    "男性",
                    "1"
                ],
                "matches": {},
                "pRowId": 5
            },
            {
                "rowId": 6,
                "cols": [
                    "女性",
                    "2"
                ],
                "matches": {},
                "pRowId": 6
            },
            {
                "rowId": 8,
                "cols": [
                    "未说明的性别",
                    "9"
                ],
                "matches": {},
                "pRowId": 8
            }
        ],
        "崂山区": [
            {
                "rowId": 2,
                "cols": [
                    "value",
                    "code"
                ],
                "matches": {},
                "pRowId": 2
            }
        ],
        "市北区": [
            {
                "rowId": 2,
                "cols": [
                    "value",
                    "code"
                ],
                "matches": {},
                "pRowId": 2
            }
        ],
        "李沧区": [
            {
                "rowId": 2,
                "cols": [
                    "value",
                    "code"
                ],
                "matches": {},
                "pRowId": 2
            }
        ],
        "莱西": [
            {
                "rowId": 2,
                "cols": [
                    "value",
                    "code"
                ],
                "matches": {},
                "pRowId": 2
            }
        ],
        "平度": [
            {
                "rowId": 2,
                "cols": [
                    "value",
                    "code"
                ],
                "matches": {},
                "pRowId": 2
            }
        ],
        "胶州": [
            {
                "rowId": 2,
                "cols": [
                    "value",
                    "code"
                ],
                "matches": {},
                "pRowId": 2
            }
        ],
        "西海岸": [
            {
                "rowId": 2,
                "cols": [
                    "value",
                    "code"
                ],
                "matches": {},
                "pRowId": 2
            }
        ]
    },
    "办证类型编码": {
        "model": [
            {
                "rowId": 2,
                "cols": [
                    "value",
                    "code"
                ],
                "matches": {
                    "城阳（办证类型）": [
                        {
                            "similar": 1,
                            "bcName": "城阳（办证类型）",
                            "rowId": 2
                        }
                    ],
                    "市南区": [
                        {
                            "similar": 1,
                            "bcName": "市南区",
                            "rowId": 2
                        }
                    ],
                    "即墨区(TYPE_OF_CERTIFICATION)": [
                        {
                            "similar": 1,
                            "bcName": "即墨区(TYPE_OF_CERTIFICATION)",
                            "rowId": 2
                        }
                    ],
                    "崂山区": [
                        {
                            "similar": 1,
                            "bcName": "崂山区",
                            "rowId": 2
                        }
                    ],
                    "市北区": [
                        {
                            "similar": 1,
                            "bcName": "市北区",
                            "rowId": 2
                        }
                    ],
                    "李沧区": [
                        {
                            "similar": 1,
                            "bcName": "李沧区",
                            "rowId": 2
                        }
                    ],
                    "莱西": [
                        {
                            "similar": 1,
                            "bcName": "莱西",
                            "rowId": 2
                        }
                    ],
                    "平度": [
                        {
                            "similar": 1,
                            "bcName": "平度",
                            "rowId": 2
                        }
                    ],
                    "胶州": [
                        {
                            "similar": 1,
                            "bcName": "胶州",
                            "rowId": 2
                        }
                    ],
                    "西海岸": [
                        {
                            "similar": 1,
                            "bcName": "西海岸",
                            "rowId": 2
                        }
                    ]
                },
                "pRowId": ""
            },
            {
                "rowId": 3,
                "cols": [
                    "居住证",
                    "01"
                ],
                "matches": {
                    "即墨区(TYPE_OF_CERTIFICATION)": [
                        {
                            "similar": 1,
                            "bcName": "即墨区(TYPE_OF_CERTIFICATION)",
                            "rowId": 3
                        }
                    ]
                },
                "pRowId": ""
            },
            {
                "rowId": 4,
                "cols": [
                    "暂住证",
                    "02"
                ],
                "matches": {
                    "即墨区(TYPE_OF_CERTIFICATION)": [
                        {
                            "similar": 1,
                            "bcName": "即墨区(TYPE_OF_CERTIFICATION)",
                            "rowId": 4
                        }
                    ]
                },
                "pRowId": ""
            },
            {
                "rowId": 5,
                "cols": [
                    "其他",
                    "99"
                ],
                "matches": {
                    "即墨区(TYPE_OF_CERTIFICATION)": [
                        {
                            "similar": 1,
                            "bcName": "即墨区(TYPE_OF_CERTIFICATION)",
                            "rowId": 5
                        }
                    ]
                },
                "pRowId": ""
            }
        ],
        "城阳（办证类型）": [
            {
                "rowId": 2,
                "cols": [
                    "value",
                    "id",
                    "code"
                ],
                "matches": {},
                "pRowId": 2
            },
            {
                "rowId": 7,
                "cols": [
                    "蒙中边境地区出入境通行证",
                    "1018",
                    "64127"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 8,
                "cols": [
                    "居民身份证",
                    "731",
                    "6401"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 9,
                "cols": [
                    "临时居民身份证",
                    "732",
                    "6402"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 10,
                "cols": [
                    "户口薄",
                    "733",
                    "6403"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 11,
                "cols": [
                    "中国人民解放军军官证",
                    "895",
                    "6404"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 12,
                "cols": [
                    "中国人民武装警察部队警官证",
                    "896",
                    "6405"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 13,
                "cols": [
                    "暂住证",
                    "897",
                    "6406"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 14,
                "cols": [
                    "出生医学证明",
                    "898",
                    "6407"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 15,
                "cols": [
                    "法官证",
                    "899",
                    "6408"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 16,
                "cols": [
                    "警官证",
                    "900",
                    "6409"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 17,
                "cols": [
                    "检察官证",
                    "901",
                    "6410"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 18,
                "cols": [
                    "律师证",
                    "902",
                    "6411"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 19,
                "cols": [
                    "记者证",
                    "903",
                    "6412"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 20,
                "cols": [
                    "工作证",
                    "904",
                    "6413"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 21,
                "cols": [
                    "学生证",
                    "905",
                    "6414"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 22,
                "cols": [
                    "出入证",
                    "906",
                    "6415"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 23,
                "cols": [
                    "临时出入证",
                    "907",
                    "6416"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 24,
                "cols": [
                    "住宿证",
                    "908",
                    "6417"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 25,
                "cols": [
                    "医疗证",
                    "909",
                    "6418"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 26,
                "cols": [
                    "劳保证",
                    "910",
                    "6419"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 27,
                "cols": [
                    "献血证",
                    "911",
                    "6420"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 28,
                "cols": [
                    "保险单",
                    "912",
                    "6421"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 29,
                "cols": [
                    "会员证",
                    "913",
                    "6422"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 30,
                "cols": [
                    "离休证",
                    "914",
                    "6423"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 31,
                "cols": [
                    "退休证",
                    "915",
                    "6424"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 32,
                "cols": [
                    "老年证",
                    "916",
                    "6425"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 33,
                "cols": [
                    "残疾证",
                    "917",
                    "6426"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 34,
                "cols": [
                    "结婚证",
                    "918",
                    "6427"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 35,
                "cols": [
                    "离婚证",
                    "919",
                    "6428"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 36,
                "cols": [
                    "独生子女证",
                    "920",
                    "6429"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 37,
                "cols": [
                    "毕业证书",
                    "921",
                    "6430"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 38,
                "cols": [
                    "肄业证",
                    "922",
                    "6431"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 39,
                "cols": [
                    "结业证",
                    "923",
                    "6432"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 40,
                "cols": [
                    "学位证",
                    "924",
                    "6433"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 41,
                "cols": [
                    "军人通行证",
                    "925",
                    "6434"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 42,
                "cols": [
                    "证明信",
                    "926",
                    "6435"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 43,
                "cols": [
                    "持枪证",
                    "927",
                    "6436"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 44,
                "cols": [
                    "枪证",
                    "928",
                    "6437"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 45,
                "cols": [
                    "持枪(弹药)携运许可证",
                    "929",
                    "6438"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 46,
                "cols": [
                    "砍伐证",
                    "930",
                    "6439"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 47,
                "cols": [
                    "准运证",
                    "931",
                    "6440"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 48,
                "cols": [
                    "准购证",
                    "932",
                    "6441"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 49,
                "cols": [
                    "粮油证",
                    "933",
                    "6442"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 50,
                "cols": [
                    "购煤证",
                    "934",
                    "6443"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 51,
                "cols": [
                    "购煤气证",
                    "935",
                    "6444"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 52,
                "cols": [
                    "房屋产权证",
                    "936",
                    "6445"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 53,
                "cols": [
                    "土地使用证",
                    "937",
                    "6446"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 54,
                "cols": [
                    "车辆通行证",
                    "938",
                    "6447"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 55,
                "cols": [
                    "机动车驾驶证",
                    "939",
                    "6448"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 56,
                "cols": [
                    "机动车行驶证",
                    "940",
                    "6449"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 57,
                "cols": [
                    "机动车登记证书",
                    "941",
                    "6450"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 58,
                "cols": [
                    "机动车年检合格证",
                    "942",
                    "6451"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 59,
                "cols": [
                    "春运临时检验合格证",
                    "943",
                    "6452"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 60,
                "cols": [
                    "飞机驾驶证",
                    "944",
                    "6453"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 61,
                "cols": [
                    "船舶驾驶证",
                    "945",
                    "6454"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 62,
                "cols": [
                    "船舶行驶证",
                    "946",
                    "6455"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 63,
                "cols": [
                    "自行车行驶证",
                    "947",
                    "6456"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 64,
                "cols": [
                    "汽车号牌",
                    "948",
                    "6457"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 65,
                "cols": [
                    "拖拉机牌",
                    "949",
                    "6458"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 66,
                "cols": [
                    "摩托车牌",
                    "950",
                    "6459"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 67,
                "cols": [
                    "船舶牌",
                    "951",
                    "6460"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 68,
                "cols": [
                    "三轮车牌",
                    "952",
                    "6461"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 69,
                "cols": [
                    "自行车牌",
                    "953",
                    "6462"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 70,
                "cols": [
                    "残疾人机动轮椅车",
                    "954",
                    "6463"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 71,
                "cols": [
                    "外交护照",
                    "955",
                    "6464"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 72,
                "cols": [
                    "公务护照",
                    "956",
                    "6465"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 73,
                "cols": [
                    "因公普通护照",
                    "957",
                    "6466"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 74,
                "cols": [
                    "普通护照",
                    "958",
                    "6467"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 75,
                "cols": [
                    "旅行证",
                    "959",
                    "6468"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 76,
                "cols": [
                    "入出境通行证",
                    "960",
                    "6469"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 77,
                "cols": [
                    "外国人出入境证",
                    "961",
                    "6470"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 78,
                "cols": [
                    "外国人旅行证",
                    "962",
                    "6471"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 79,
                "cols": [
                    "海员证",
                    "963",
                    "6472"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 80,
                "cols": [
                    "香港特别行政区护照",
                    "964",
                    "6473"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 81,
                "cols": [
                    "澳门特别行政区护照",
                    "965",
                    "6474"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 82,
                "cols": [
                    "香港特别行政区旅行证",
                    "966",
                    "6475"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 83,
                "cols": [
                    "台湾居民来往大陆通行证",
                    "967",
                    "6476"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 84,
                "cols": [
                    "台湾居民来往大陆通行证(一次有效)",
                    "968",
                    "6477"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 85,
                "cols": [
                    "往来港澳通行证",
                    "969",
                    "6478"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 86,
                "cols": [
                    "前往港澳通行证",
                    "970",
                    "6479"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 87,
                "cols": [
                    "港澳同胞回乡证(通行卡)",
                    "971",
                    "6480"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 88,
                "cols": [
                    "大陆居民来往台湾通行证",
                    "972",
                    "6481"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 89,
                "cols": [
                    "因公往来香港澳门特别行政区通行证",
                    "973",
                    "6482"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 90,
                "cols": [
                    "华侨回国定居证",
                    "974",
                    "6483"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 91,
                "cols": [
                    "台湾居民定居证",
                    "975",
                    "6484"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 92,
                "cols": [
                    "外国人永久定居证",
                    "976",
                    "6485"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 93,
                "cols": [
                    "外国人居留证",
                    "977",
                    "6486"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 94,
                "cols": [
                    "外国人临时居留证",
                    "978",
                    "6487"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 95,
                "cols": [
                    "入籍证书",
                    "979",
                    "6488"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 96,
                "cols": [
                    "出籍证书",
                    "980",
                    "6489"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 97,
                "cols": [
                    "复籍证书",
                    "981",
                    "6490"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 98,
                "cols": [
                    "外籍船员住宿证",
                    "982",
                    "6491"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 99,
                "cols": [
                    "随船工作证",
                    "983",
                    "6492"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 100,
                "cols": [
                    "海上值勤证(红色)",
                    "984",
                    "6493"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 101,
                "cols": [
                    "海上值勤证(蓝色)",
                    "985",
                    "6494"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 102,
                "cols": [
                    "出海船民证",
                    "986",
                    "6495"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 103,
                "cols": [
                    "出海船舶户口簿",
                    "987",
                    "6496"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 104,
                "cols": [
                    "出海船舶边防登记簿",
                    "988",
                    "6497"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 105,
                "cols": [
                    "搭靠台轮许可证",
                    "989",
                    "6498"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 106,
                "cols": [
                    "台湾居民登陆证",
                    "990",
                    "6499"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 107,
                "cols": [
                    "台湾船员登陆证",
                    "991",
                    "64100"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 108,
                "cols": [
                    "外国船员登陆证",
                    "992",
                    "64101"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 109,
                "cols": [
                    "对台劳务人员登轮作业证",
                    "993",
                    "64102"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 110,
                "cols": [
                    "合资船船员登陆证",
                    "994",
                    "64103"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 111,
                "cols": [
                    "合资船船员登轮作业证",
                    "995",
                    "64104"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 112,
                "cols": [
                    "粤港澳流动渔民证",
                    "996",
                    "64105"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 113,
                "cols": [
                    "粤港澳临时流动渔民证",
                    "997",
                    "64106"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 114,
                "cols": [
                    "粤港澳流动渔民户口簿",
                    "998",
                    "64107"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 115,
                "cols": [
                    "航行港澳船舶证明书",
                    "999",
                    "64108"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 116,
                "cols": [
                    "往来港澳小型船舶查验簿",
                    "1000",
                    "64109"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 117,
                "cols": [
                    "劳务人员登船作业证",
                    "1001",
                    "64110"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 118,
                "cols": [
                    "边境管理区通行证",
                    "1002",
                    "64111"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 119,
                "cols": [
                    "中朝鸭绿江、图们江水文作业证",
                    "1003",
                    "64112"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 120,
                "cols": [
                    "朝中鸭绿江、图们江水文作业证",
                    "1004",
                    "64113"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 121,
                "cols": [
                    "中朝流筏固定代表证",
                    "1005",
                    "64114"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 122,
                "cols": [
                    "朝中鸭绿江、图们江船员证",
                    "1006",
                    "64115"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 123,
                "cols": [
                    "中朝鸭绿江、图们江船员证",
                    "1007",
                    "64116"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 124,
                "cols": [
                    "中朝边境地区公安总代表证",
                    "1008",
                    "64117"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 125,
                "cols": [
                    "朝中边境地区公安总代表证",
                    "1009",
                    "64118"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 126,
                "cols": [
                    "中朝边境地区公安副总代表证",
                    "1010",
                    "64119"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 127,
                "cols": [
                    "朝中边境地区公安副总代表证",
                    "1011",
                    "64120"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 128,
                "cols": [
                    "中朝边境地区公安代表证",
                    "1012",
                    "64121"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 129,
                "cols": [
                    "朝中边境地区公安代表证",
                    "1013",
                    "64122"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 130,
                "cols": [
                    "中朝边境地区出入境通行证(甲、乙种本)",
                    "1014",
                    "64123"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 131,
                "cols": [
                    "朝中边境公务通行证",
                    "1015",
                    "64124"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 132,
                "cols": [
                    "朝中边境住民国境通行证",
                    "1016",
                    "64125"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 133,
                "cols": [
                    "中蒙边境地区出入境通行证(甲、乙种本)",
                    "1017",
                    "64126"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 134,
                "cols": [
                    "中缅边境出入境通行证",
                    "1019",
                    "64128"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 135,
                "cols": [
                    "缅甸中国边境通行证",
                    "1020",
                    "64129"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 136,
                "cols": [
                    "云南省边境地区境外民入出境证",
                    "1021",
                    "64130"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 137,
                "cols": [
                    "中尼边境地区出入境通行证",
                    "1022",
                    "64131"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 138,
                "cols": [
                    "尼中边境地区出入境通行证",
                    "1023",
                    "64132"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 139,
                "cols": [
                    "中越边境地区出入境通行证",
                    "1024",
                    "64133"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 140,
                "cols": [
                    "越中边境地区出入境通行证",
                    "1025",
                    "64134"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 141,
                "cols": [
                    "中老边境地区出入境通行证",
                    "1026",
                    "64135"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 142,
                "cols": [
                    "老中边境地区出入境通行证",
                    "1027",
                    "64136"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 143,
                "cols": [
                    "中印边境地区出入境通行证",
                    "1028",
                    "64137"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 144,
                "cols": [
                    "印中边境地区出入境通行证",
                    "1029",
                    "64138"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 145,
                "cols": [
                    "深圳市过境耕作证",
                    "1030",
                    "64139"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 146,
                "cols": [
                    "贸易证",
                    "1031",
                    "64140"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 147,
                "cols": [
                    "铁路员工证",
                    "1032",
                    "64141"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 148,
                "cols": [
                    "机组人员证",
                    "1033",
                    "64142"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 149,
                "cols": [
                    "其他",
                    "1034",
                    "64143"
                ],
                "matches": {},
                "pRowId": ""
            },
            {
                "rowId": 150,
                "cols": [
                    "其他",
                    "1700",
                    "64144"
                ],
                "matches": {},
                "pRowId": ""
            }
        ],
        "市南区": [
            {
                "rowId": 2,
                "cols": [
                    "value",
                    "code"
                ],
                "matches": {},
                "pRowId": 2
            }
        ],
        "即墨区(TYPE_OF_CERTIFICATION)": [
            {
                "rowId": 2,
                "cols": [
                    "value",
                    "code"
                ],
                "matches": {},
                "pRowId": 2
            },
            {
                "rowId": 3,
                "cols": [
                    "居住证",
                    "01"
                ],
                "matches": {},
                "pRowId": 3
            },
            {
                "rowId": 4,
                "cols": [
                    "暂住证",
                    "02"
                ],
                "matches": {},
                "pRowId": 4
            },
            {
                "rowId": 5,
                "cols": [
                    "其他",
                    "99"
                ],
                "matches": {},
                "pRowId": 5
            }
        ],
        "崂山区": [
            {
                "rowId": 2,
                "cols": [
                    "value",
                    "code"
                ],
                "matches": {},
                "pRowId": 2
            }
        ],
        "市北区": [
            {
                "rowId": 2,
                "cols": [
                    "value",
                    "code"
                ],
                "matches": {},
                "pRowId": 2
            }
        ],
        "李沧区": [
            {
                "rowId": 2,
                "cols": [
                    "value",
                    "code"
                ],
                "matches": {},
                "pRowId": 2
            }
        ],
        "莱西": [
            {
                "rowId": 2,
                "cols": [
                    "value",
                    "code"
                ],
                "matches": {},
                "pRowId": 2
            }
        ],
        "平度": [
            {
                "rowId": 2,
                "cols": [
                    "value",
                    "code"
                ],
                "matches": {},
                "pRowId": 2
            }
        ],
        "胶州": [
            {
                "rowId": 2,
                "cols": [
                    "value",
                    "code"
                ],
                "matches": {},
                "pRowId": 2
            }
        ],
        "西海岸": [
            {
                "rowId": 2,
                "cols": [
                    "value",
                    "code"
                ],
                "matches": {},
                "pRowId": 2
            }
        ]
    }
}