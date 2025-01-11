<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: 'Trabajador', // Set your GitHub username here
      repos: [],
      totalLines: 0,
      loading: false,
      error: null,
      token: '', // Add your GitHub personal access token here
    };
  },
  mounted() {
    this.token = import.meta.env.VITE_GITHUB_TOKEN;

    if (!this.token) {
      console.error('GitHub token is not defined. Please check your .env file.');
    } else {
      console.log('GitHub token loaded successfully!');
      // Automatically fetch repositories and line counts when the page loads
      this.fetchRepositories();
    }
  },
  methods: {
    async fetchRepositories() {
      this.loading = true;
      this.error = null;
      this.repos = [];
      this.totalLines = 0;

      try {
        // Fetch all repositories (public + private)
        const repoResponse = await axios.get(
          `https://api.github.com/user/repos?per_page=100`,
          {
            headers: {
              Authorization: `token ${this.token}`,
            },
          }
        );
        const repos = repoResponse.data;

        // Loop through each repository and count lines
        for (const repo of repos) {
          const lineCount = await this.countLinesInRepo(repo);
          this.repos.push({ ...repo, lines: lineCount });
          this.totalLines += lineCount;
        }
      } catch (error) {
        this.error = 'An error occurred fetching repositories.';
      } finally {
        this.loading = false;
      }
    },

    async countLinesInRepo(repo) {
      try {
        const languageUrl = `https://api.github.com/repos/${repo.owner.login}/${repo.name}/languages`;
        const languagesResponse = await axios.get(languageUrl, {
          headers: {
            Authorization: `token ${this.token}`,
          },
        });

        const languages = languagesResponse.data;

        // If no languages data is returned, skip this repo
        if (!languages || Object.keys(languages).length === 0) {
          console.log(`No languages data for repo: ${repo.name}`);
          return 0;
        }

        // Sum the number of lines in all languages
        const lineCount = Object.values(languages).reduce((a, b) => a + b, 0);

        // Return the sum (this is in bytes, not actual lines of code)
        return lineCount;

      } catch (error) {
        console.error(`Error getting language stats for repo ${repo.name}:`, error);
        return 0;
      }
    },

     // New method to format totalLines
     formatTotalLines(lines) {
      if (lines < 1000) return lines + '';
      const units = ['K', 'M', 'B'];
      let index = -1;
      do {
        lines /= 1000;
        index++;
      } while (lines >= 1000 && index < units.length - 1);
      return lines.toFixed(1) + units[index];
    }
  },
};
</script>

<template>
  <!-- <div>
    <h1>GitHub Line Counter</h1>

    <div v-if="error">{{ error }}</div>
    <div v-if="loading">Loading...</div>

    <div v-if="repos.length">
      <h2>Repositories for {{ username }}</h2>
      <ul>
        <li v-for="repo in repos" :key="repo.id">
          {{ repo.name }} - Lines of Code: {{ repo.lines }}
        </li>
      </ul>
      <h3>Total Lines of Code: {{ totalLines }}</h3>
    </div>
  </div> -->
  {{ formatTotalLines(totalLines) }}
</template>
