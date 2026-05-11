import { fetchList } from "../content.js";
import { embed } from "../util.js";
import Spinner from "../components/Spinner.js";
import LevelAuthors from "../components/List/LevelAuthors.js";

export default {
    template: `
        <div class="packs-container">
            <div class="list-sidebar">
                <div class="pack-card" style="background: #3498db;">Beginner Pack</div>
            </div>

            <div class="level-list-middle">
                <div class="level-row active">
                    <span class="rank">#1</span> bottom 1
                </div>
                <div class="level-row">
                    <span class="rank">#2</span> ez wave lvl
                </div>
            </div>

            <div class="level-details-right">
                <h1>bottom 1</h1>
                <p><strong>CREATOR:</strong> DD</p>
                <div class="video-window">
                </div>
            </div>
        </div>
    <div class="video-window">
    <iframe 
        src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
        frameborder="0" 
        allow="allowfullscreen">
    </iframe>
</div>
        `,
};