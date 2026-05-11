import { fetchList } from "../content.js";
import { embed } from "../util.js";
import Spinner from "../components/Spinner.js";
import LevelAuthors from "../components/List/LevelAuthors.js";

export default {
  components: { Spinner, LevelAuthors },
  data: () => ({
    packs: [],
    list: [],
    selectedPackIndex: 0,
    selectedLevelIndex: 0,
    loading: true,
  }),
  computed: {
    selectedPack() {
      return this.packs[this.selectedPackIndex] || null;
    },
    selectedLevelId() {
      return this.selectedPack?.levels[this.selectedLevelIndex] || null;
    },
    selectedLevel() {
      return this.list.find(([lvl]) => lvl?.id === this.selectedLevelId)?.[0] || null;
    },
    getOriginalRank() {
      return (levelId) => {
        return (
          this.list.findIndex(([lvl]) => lvl?.id === levelId) + 1 || "?"
        );
      };
    },
  },
  async mounted() {
    const list = await fetchList();
    const packsData = await fetch("/data/_packs.json").then((res) => res.json());

    this.list = list;
    this.packs = packsData;
    this.loading = false;
  },
  methods: {
    embed,
  },
  template: `
    <main v-if="packs">
    <div class="packs-container">
        <div class="list-sidebar">
            <div v-for="(pack, index) in packs" 
                 class="pack-card" 
                 @click="selected = index"
                 :class="{ 'active': selected === index }">
                {{ pack.name }}
            </div>
        </div>

        <div class="level-list-middle">
            <div v-for="(level, i) in packs[selected].levels" 
                 class="level-row"
                 @click="selectedLevel = i"
                 :class="{ 'active': selectedLevel === i }">
                <span class="rank">#{{ i + 1 }}</span> {{ level.name }}
            </div>
        </div>

        <div class="level-details-right">
            <h1>{{ packs[selected].levels[selectedLevel].name }}</h1>
            <p><strong>CREATOR:</strong> {{ packs[selected].levels[selectedLevel].creator }}</p>

            <div class="video-window">
                <iframe :src="'https://www.youtube.com/embed/' + packs[selected].levels[selectedLevel].ytId" frameborder="0"></iframe>
            </div>
        </div>
    </div>
</main>
  `,
};