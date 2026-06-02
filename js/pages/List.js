import { store } from "../main.js";
import { embed } from "../util.js";
import { score } from "../score.js";
import { fetchEditors, fetchList } from "../content.js";

import Spinner from "../components/Spinner.js";
import LevelAuthors from "../components/List/LevelAuthors.js";

const roleIconMap = {
    owner: "crown",
    admin: "user-gear",
    helper: "user-shield",
    dev: "code",
    trial: "user-lock",
};

export default {
    components: { Spinner, LevelAuthors },
    template: `
        <main v-if="loading">
            <Spinner></Spinner>
        </main>
        <main v-else class="page-list">
            <div class="list-container">
                <div class="filter-container" style="margin-bottom: 15px; display: flex; gap: 15px; padding: 5px 10px;">
                    <button @click="sortBy = 'rank'; selected = 0" :style="{ color: sortBy === 'rank' ? '#fff' : '#aaa', fontWeight: sortBy === 'rank' ? 'bold' : 'normal', background: 'none', border: 'none', cursor: 'pointer' }">
                        GLCL Rank
                    </button>
                    <button @click="sortBy = 'enjoyment'; selected = 0" :style="{ color: sortBy === 'enjoyment' ? '#fff' : '#aaa', fontWeight: sortBy === 'enjoyment' ? 'bold' : 'normal', background: 'none', border: 'none', cursor: 'pointer' }">
                        GLCL Enjoyment
                    </button>
                </div>
                <table class="list" v-if="sortedList">
                    <tr v-for="([level, err], i) in sortedList">
                        <td class="rank">
                            <p v-if="list.findIndex(item => item[0]?.id === level?.id) + 1 <= 50" class="type-label-lg">
                                #{{ list.findIndex(item => item[0]?.id === level?.id) + 1 }}
                            </p>
                            <p v-else class="type-label-lg">Legacy</p>
                        </td>
                        <td class="level" :class="{ 'active': selected == i, 'error': !level }">
                            <button @click="selected = i">
                                <span class="type-label-lg">{{ level?.name || \`Error (\${err}.json)\` }}</span>
                            </button>
                        </td>
                    </tr>
                </table>
            </div>
            <div class="level-container">
                <div class="level" v-if="level">
                    <h1>{{ level.name }}</h1>
                    <p v-if="level.description" style="margin-bottom: 15px;">{{ level.description }}</p>
                    <div v-if="level.tags && level.tags.length" class="level-tags-container">
    <div 
        v-for="tag in level.tags" 
        :key="tag" 
        :class="['tag-wrapper', tag.toLowerCase()]"
    >
        <span class="level-tag">{{ tag }}</span>
        
        <span class="tag-tooltip">
            {{
                {
                    '2.2': 'Challenges that were released in update 2.2.',
                    '2.1': 'Challenges that were released in update 2.1.',
                    'cube': 'Challenges that mainly focus on cube gameplay.',
                    'ship': 'Challenges that mainly focus on ship gameplay.',
                    'ball': 'Challenges that mainly focus on ball gameplay.',
                    'ufo': 'Challenges that mainly focus on UFO gameplay.',
                    'wave': 'Challenges that mainly focus on wave gameplay.',
                    'robot': 'Challenges that mainly focus on robot gameplay.',
                    'spider': 'Challenges that mainly focus on spider gameplay.',
                    'duals': 'Challenges that mainly focus on dual gameplay.',
                    '2.2 swing': 'Challenges that mainly focus on 2.2 swing gameplay.',
                    '2.1 swing': 'Challenges that mainly focus on 2.1 swing gameplay.',
                    'tiny': 'Challenges that are tiny in length (1-10 seconds).',
                    'short': 'Challenges that are short in length (10-29 seconds).',
                    'overall': 'Challenges with a balanced mix of all gameplay types.',
                    'timings': 'Challenges that focus heavily on precise timings (cube, ball, UFO, robot, spider).',
                    'chokepoints': 'Challenges containing highly specific difficulty spikes.',
                    'nerve control': 'Challenges that challenge a players ability to stay calm near the end.',
                    'memory': 'Challenges with gameplay that cannot be easily read visually.',
                    'gimmicky': 'Challenges with unconventional or unique gameplay mechanics.',
                    'learny': 'Challenges that take longer than usual to memorize.',
                    'high cps': 'Challenges requiring a high number of clicks per second.',
                    'slow-paced': 'Challenges with slower-paced gameplay.',
                    'fast-paced': 'Challenges with fast-paced gameplay.',
                }[tag.toLowerCase()] || 'Geometry Dash level characteristic.'
            }}
        </span>
    </div>
</div>
                    <LevelAuthors :author="level.author" :creators="level.creators" :verifier="level.verifier"></LevelAuthors>
                    <iframe class="video" id="videoframe" :src="video" frameborder="0"></iframe>
                    <ul class="stats">
  <li>
    <div class="type-title-sm">Points when completed</div>
    <p>{{ score(list.findIndex(item => item[0]?.id === level?.id) + 1, 100, level.percentToQualify) }}</p>
  </li>
  <li>
    <div class="type-title-sm">ID</div>
    <p>{{ level.id }}</p>
  </li>
  <li>
    <div class="type-title-sm">Enjoyment</div>
    <p>{{ getAverageEnjoyment(level.enjoyment) }}</p>
  </li>
</ul>
                    <template v-if="level.positionHistory && level.positionHistory.length > 0">
    <div style="font-family: 'Inter', 'Segoe UI', Arial, sans-serif; margin-top: 20px;">
        
        <div 
            @click="showPositionHistory = !showPositionHistory" 
            style="display: flex; align-items: center; gap: 8px; cursor: pointer; user-select: none; margin-bottom: 10px;"
        >
            <h3 style="margin: 0; font-size: 1.2rem;">Position History</h3>
            <span :style="{ 
                transform: showPositionHistory ? 'rotate(180deg)' : 'rotate(0deg)', 
                transition: 'transform 0.2s ease',
                fontSize: '0.8rem',
                color: '#aaa'
            }">▼</span>
        </div>

        <table v-if="showPositionHistory" class="records" style="margin-bottom: 20px; width: 100%;">
            <thead>
                <tr>
                    <th style="text-align: left; padding: 8px 5px; border-bottom: 1px solid #333;">New Position</th>
                    <th style="text-align: center; padding: 8px 5px; border-bottom: 1px solid #333;">Change</th>
                    <th style="text-align: left; padding: 8px 5px; border-bottom: 1px solid #333;">Reason</th>
                    <th style="text-align: right; padding: 8px 5px; border-bottom: 1px solid #333;">Date</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="history in level.positionHistory" :class="['record', history.change > 0 ? 'history-up' : history.change < 0 ? 'history-down' : 'history-neutral']">
    <td style="padding: 10px 5px;">
        <strong>#{{ history.position }}</strong>
    </td>
    
    <td style="text-align: center; padding: 10px 5px;">
        <strong>
            <span v-if="history.change > 0">↑ {{ history.change }}</span>
            <span v-else-if="history.change < 0">↓ {{ Math.abs(history.change) }}</span>
            <span v-else>-</span>
        </strong>
    </td>
<td style="padding: 10px 5px;">
    <strong>{{ history.causeName }}&nbsp;{{ history.causeAction }}</strong>
</td>
    <td style="text-align: right; padding: 10px 5px; color: #aaa;"><strong>{{ history.date }}</strong></td>
</tr>
                </tr>
            </tbody>
        </table>
        
    </div>
</template>
                    <h2>Records</h2>
                    <p v-if="selected + 1 <= 75"><strong>{{ level.percentToQualify }}%</strong> or better to qualify</p>
                    <p v-else-if="selected +1 <= 150"><strong>100%</strong> or better to qualify</p>
                    <p v-else>This level does not accept new records.</p>
                    <table class="records">
                        <tr v-for="record in level.records" class="record">
                            <td class="percent">
                                <p>{{ record.percent }}%</p>
                            </td>
                            <td class="user">
                                <a :href="record.link" target="_blank" class="type-label-lg">{{ record.user }}</a>
                            </td>
                            <td class="mobile">
                                <img v-if="record.mobile" :src="\`/assets/phone-landscape\${store.dark ? '-dark' : ''}.svg\`" alt="Mobile">
                            </td>
                            <td class="hz">
                                <p>{{ record.hz }}Hz</p>
                            </td>
                        </tr>
                    </table>
                </div>
                <div v-else class="level" style="height: 100%; justify-content: center; align-items: center;">
                    <p>(ノಠ益ಠ)ノ彡┻━┻</p>
                </div>
            </div>
            <div class="meta-container">
                <div class="meta">
                    <div class="errors" v-show="errors.length > 0">
                        <p class="error" v-for="error of errors">{{ error }}</p>
                    </div>
                    <div class="og">
                        <p class="type-label-md">Website layout made by <a href="https://tsl.pages.dev/" target="_blank">TheShittyList</a></p>
                    </div>
                    <template v-if="editors">
                        <h3>List Editors</h3>
                        <ol class="editors">
                            <li v-for="editor in editors">
                                <img :src="\`/assets/\${roleIconMap[editor.role]}\${store.dark ? '-dark' : ''}.svg\`" :alt="editor.role">
                                <a v-if="editor.link" class="type-label-lg link" target="_blank" :href="editor.link">{{ editor.name }}</a>
                                <p v-else>{{ editor.name }}</p>
                            </li>
                        </ol>
                    </template>
                    <h3>Submission Requirements</h3>
                    <p>
                        The record must be achieved without the use of hacks, however FPS Bypass up to 480fps as well as CBF are allowed.
                    </p>
                    <p>
                        Have either source audio or clicks/taps in the video. Edited audio only does not count
                    </p>
                    <p>
                        The recording must have a previous attempt and entire death animation shown before the completion, unless the completion is on the first attempt.
                    </p>
                    <p>
                        The recording must also show the player hit the endwall, or the completion will be invalidated.
                    </p>
                    <p>
                        Do not use secret routes or bug routes.
                    </p>
                    <p>
                        Any verifications of levels that dont have the legacy setting "fix gravity bug" off, will not be placed on the list. The reason for this rule is because most GD players are used to the 2.1 ship physics which were changed in 2.2 where RobTop "fixed a gravity bug".
                    </p>
                </div>
            </div>
        </main>
    `,
    data: () => ({
        list: [],
        editors: [],
        loading: true,
        selected: 0,
        errors: [],
        roleIconMap,
        store,
        sortBy: 'rank',
        showPositionHistory: false
    }),
    computed: {
        level() {
            return this.sortedList[this.selected]?.[0];
        },
        video() {
            if (!this.level || !this.level.showcase) {
                return embed(this.level?.verification);
            }

            return embed(
                this.toggledShowcase
                    ? this.level.showcase
                    : this.level.verification
            );
        },
        sortedList() {
            if (!this.list) return [];
            
            let listCopy = [...this.list];
            
            if (this.sortBy === 'enjoyment') {
                return listCopy.sort((a, b) => {
                    const levelA = a[0];
                    const levelB = b[0];
                    
                    const enjoyA = this.getAverageEnjoyment(levelA?.enjoyment);
                    const enjoyB = this.getAverageEnjoyment(levelB?.enjoyment);
                    
                    const scoreA = enjoyA === 'N/A' ? -1 : enjoyA;
                    const scoreB = enjoyB === 'N/A' ? -1 : enjoyB;
                    
                    return scoreB - scoreA;
                });
            }
            
            return listCopy;
        }
    },
    async mounted() {
        this.list = await fetchList();
        this.editors = await fetchEditors();

        if (!this.list) {
            this.errors = [
                "Failed to load list. Retry in a few minutes or notify list staff.",
            ];
        } else {
            this.errors.push(
                ...this.list
                    .filter(([_, err]) => err)
                    .map(([_, err]) => {
                        return `Failed to load level. (${err}.json)`;
                    })
            );
            if (!this.editors) {
                this.errors.push("Failed to load list editors.");
            }
        }

        this.loading = false;
    },
    methods: {
        embed,
        score,
        getAverageEnjoyment(ratings) {
            if (!ratings || !Array.isArray(ratings) || ratings.length === 0) {
                return 'N/A';
            }
            const sum = ratings.reduce((total, current) => total + current, 0);
            const average = sum / ratings.length;
            return Math.round(average * 100) / 100;
        }
    }
};