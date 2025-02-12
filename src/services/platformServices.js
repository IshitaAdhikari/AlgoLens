const LEETCODE_API = 'https://leetcode-stats-api.herokuapp.com';
const CODEFORCES_API = 'https://codeforces.com/api';
const GFG_API = 'https://geeksforgeeks.org/api';

export const fetchLeetCodeStats = async (username) => {
  try {
    const response = await fetch(`${LEETCODE_API}/${username}`);
    const data = await response.json();
    
    if (data.status === 'error') {
      throw new Error('Profile not found');
    }

    return {
      totalSolved: data.totalSolved,
      easySolved: data.easySolved,
      mediumSolved: data.mediumSolved,
      hardSolved: data.hardSolved,
      acceptanceRate: data.acceptanceRate,
      ranking: data.ranking,
      contributionPoints: data.contributionPoints
    };
  } catch (error) {
    throw new Error('Failed to fetch LeetCode stats');
  }
};

export const fetchCodeforcesStats = async (handle) => {
  try {
    const [userInfo, userStatus] = await Promise.all([
      fetch(`${CODEFORCES_API}/user.info?handles=${handle}`),
      fetch(`${CODEFORCES_API}/user.status?handle=${handle}`)
    ]);

    const userInfoData = await userInfo.json();
    const userStatusData = await userStatus.json();

    if (userInfoData.status !== 'OK') {
      throw new Error('Profile not found');
    }

    const problems = new Set(
      userStatusData.result
        .filter(submission => submission.verdict === 'OK')
        .map(submission => submission.problem.name)
    );

    return {
      rating: userInfoData.result[0].rating,
      maxRating: userInfoData.result[0].maxRating,
      rank: userInfoData.result[0].rank,
      problemsSolved: problems.size,
      contributions: userInfoData.result[0].contribution
    };
  } catch (error) {
    throw new Error('Failed to fetch Codeforces stats');
  }
};

export const fetchCodechefStats = async (username) => {
  // CodeChef doesn't provide a public API, we'll need to use web scraping or their OAuth API
  try {
    // Simulated data for now
    return {
      rating: Math.floor(Math.random() * 1000) + 1500,
      maxRating: Math.floor(Math.random() * 1000) + 1800,
      problemsSolved: Math.floor(Math.random() * 200) + 100,
      contests: Math.floor(Math.random() * 50) + 10
    };
  } catch (error) {
    throw new Error('Failed to fetch CodeChef stats');
  }
};

export const updateUserStats = async (platforms) => {
  let totalProblems = 0;
  let currentRating = 0;
  let highestRating = 0;
  let totalContests = 0;
  const stats = {};

  try {
    for (const [platform, username] of Object.entries(platforms)) {
      if (!username) continue;

      switch (platform) {
        case 'leetcode':
          const lcStats = await fetchLeetCodeStats(username);
          stats.leetcode = lcStats;
          totalProblems += lcStats.totalSolved;
          break;

        case 'codeforces':
          const cfStats = await fetchCodeforcesStats(username);
          stats.codeforces = cfStats;
          totalProblems += cfStats.problemsSolved;
          currentRating = Math.max(currentRating, cfStats.rating);
          highestRating = Math.max(highestRating, cfStats.maxRating);
          totalContests++;
          break;

        case 'codechef':
          const ccStats = await fetchCodechefStats(username);
          stats.codechef = ccStats;
          totalProblems += ccStats.problemsSolved;
          currentRating = Math.max(currentRating, ccStats.rating);
          highestRating = Math.max(highestRating, ccStats.maxRating);
          totalContests += ccStats.contests;
          break;
      }
    }

    return {
      aggregateStats: {
        problemsSolved: totalProblems,
        currentRating: currentRating,
        highestRating: highestRating,
        contests: totalContests
      },
      platformStats: stats
    };
  } catch (error) {
    throw new Error('Failed to update user stats');
  }
}; 