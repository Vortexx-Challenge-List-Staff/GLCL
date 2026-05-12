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
            [
                {
                    name: "Ship Challenge V",
                    creator: "VortexxGMD",
                    ytId: "LBp8Drpm0YI" 
                },
                {
                    name: "Ship Challenge I",
                    creator: "VortexxGMD",
                    ytId: "WRBSvDhPNv4" 
                },
                {
                    name: "Ship Challenge II",
                    creator: "VortexxGMD",
                    ytId: "PVJKtslNEdg"
                }
            ]
        }
    },
    template: `
        <div class="packs-container">
            <div class="list-sidebar">
                <div class="pack-card">Beginner Pack</div>
            </div>

            <div class="level-list-middle">
                <div v-for="(level, index) in levels" 
                     class="level-row" 
                     :class="{ active: selectedLevel === index }"
                     @click="selectedLevel = index">
                    <span class="rank">#{{ index + 1 }}</span> {{ level.name }}
                </div>
            </div>

            <div class="level-details-right">
                <h1>{{ levels[selectedLevel].name }}</h1>
                <p><strong>CREATOR:</strong> {{ levels[selectedLevel].creator }}</p>

                <div class="video-window" style="position: relative; padding-top: 56.25%; background: black; border-radius: 15px; overflow: hidden;">
                    <iframe 
                        :src="'https://www.youtube.com/embed/' + levels[selectedLevel].ytId" 
                        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;"
                        allowfullscreen>
                    </iframe>
                </div>
            </div>
        </div>
    `,
};