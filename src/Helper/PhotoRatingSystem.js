// PhotoRatingSystem.js
class PhotoRatingSystem {
  constructor(initialRatings = {}, kFactor = 32) {
    this.ratings = initialRatings;
    this.kFactor = kFactor;
  }

  // Calculate the expected score
  expectedScore(ratingA, ratingB) {
    return 1 / (1 + 10 ** ((ratingB - ratingA) / 400));
  }

  // Update ratings based on the winner and loser
  updateRatings(winnerId, loserId) {
    const ratingWinner = this.ratings[winnerId] || 1000;
    const ratingLoser = this.ratings[loserId] || 1000;

    const expectedWinner = this.expectedScore(ratingWinner, ratingLoser);
    const expectedLoser = this.expectedScore(ratingLoser, ratingWinner);

    this.ratings[winnerId] = ratingWinner + this.kFactor * (1 - expectedWinner);
    this.ratings[loserId] = ratingLoser + this.kFactor * (0 - expectedLoser);

    return {
      winner: this.ratings[winnerId],
      loser: this.ratings[loserId],
    };
  }

  getRatings() {
    return this.ratings;
  }
}

export default PhotoRatingSystem;
