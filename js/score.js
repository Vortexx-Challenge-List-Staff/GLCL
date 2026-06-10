/**
 * Numbers of decimal digits to round to
 */
const scale = 3;

/**
 * Calculate the score awarded when having a certain percentage on a list level
 * @param {Number} rank Position on the list
 * @param {Number} percent Percentage of completion
 * @param {Number} minPercent Minimum percentage required
 * @returns {Number}
 */
export function score(rank, percent, minPercent) {
    // Early exits for invalid or non-qualifying records
    if (rank > 50) {
        return 0;
    }
    if (rank > 25 && percent < 100) {
        return 0;
    }
    if (percent < minPercent) {
        return 0;
    }

    // 1. Calculate the base score for 100% completion
    let base_score = -24.9975 * Math.pow(rank - 1, 0.4) + 200;
    base_score = Math.max(0, base_score);

    // 2. If fully completed, return the base score with no penalties
    if (percent === 100) {
        return Math.max(round(base_score), 0);
    }

    // 3. Calculate partial score
    // Progress is a value between 0.0 (at minPercent) and 1.0 (at 100%)
    let progress = (percent - minPercent) / (100 - minPercent);
    
    // We start the multiplier at 15% (0.15) and scale it up based on progress.
    // Why 15%? Because your 1/3 penalty below will reduce it to exactly 10%.
    let multiplier = 0.15 + (0.85 * progress);
    let partial_score = base_score * multiplier;

    // 4. Apply your standard 1/3 penalty for not finishing the level
    return round(partial_score - partial_score / 3);
}

export function round(num) {
    if (!('' + num).includes('e')) {
        return +(Math.round(num + 'e+' + scale) + 'e-' + scale);
    } else {
        var arr = ('' + num).split('e');
        var sig = '';
        if (+arr[1] + scale > 0) {
            sig = '+';
        }
        return +(
            Math.round(+arr[0] + 'e' + sig + (+arr[1] + scale)) +
            'e-' +
            scale
        );
    }
}
