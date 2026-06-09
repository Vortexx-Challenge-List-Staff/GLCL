import { fetchList } from "../content.js";
import { embed } from "../util.js";
import Spinner from "../components/Spinner.js";
import LevelAuthors from "../components/List/LevelAuthors.js";

export default {
    data() {
        return {
            selectedLevel: 0, // Starts at the first level (#1)
            levels: [
                {
                    name: "bottom 1",
                    creator: "DD",
                    ytId: "L3s2h_Le09w"
                },
                {
                    name: "ez wave lvl",
                    creator: "SomeoneElse",
                    ytId: "bmeW5hvQ2OA"
                },
                {
                    name: "2 2 wave challenge",
                    creator: "Shialaxy",
                    ytId: "8Uckfbht1GQ"
                }
            ]

        }
    },
    template: `
        <main class="page-list-packs">
            <div class="pack-selector">
                <button class="active">Beginner Pack</button>
            </div>

            <div class="list-container">
                <div class="list">
                    <div v-for="(level, index) in levels" 
                         class="level"
                         :class="{ active: selectedLevel === index }"
                         @click="selectedLevel = index">
                        <button>
                            <span class="type-label-lg">#{{ index + 1 }}</span> {{ level.name }}
                        </button>
                    </div>
                </div>
            </div>

            <div class="level-container">
                <div class="level">
                    <h1>{{ levels[selectedLevel].name }}</h1>
                    <p><strong>CREATOR:</strong> {{ levels[selectedLevel].creator }}</p>

                    <div class="video">
                        <iframe 
                            :src="'https://www.youtube.com/embed/' + levels[selectedLevel].ytId" 
                            allowfullscreen>
                        </iframe>
                    </div>
                </div>
            </div>
        </main>
    `,
};