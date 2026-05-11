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
    <h1 style="font-size: 3rem; font-weight: 800; margin: 0;">bottom 1</h1>
    <p style="font-weight: bold; margin-bottom: 20px;">CREATOR: DD</p>

    <div style="width: 100%; max-width: 800px; display: block;">
        <div style="position: relative; padding-top: 56.25%; background: black; border-radius: 15px; overflow: hidden;">
            <iframe 
                src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;"
                allowfullscreen>
            </iframe>
        </div>
    </div>
</div>
        `,
};