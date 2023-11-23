import { api } from "./api.js";
import { showAlert, hideAlert } from "./alert.js";
import { slower } from "./utils.js";

// DOM variables
const inputSearch = document.querySelector(".searchUser");
const profile = document.querySelector(".profile");
const showProfile = (
  {
    avatar_url,
    html_url,
    public_repos,
    public_gists,
    followers,
    following,
    company,
    blog,
    location,
    created_at,
  },
  repositoriesList,
  followerList
) => {
  profile.innerHTML = `
    <div class="card card-body mb-3">
        <div class="row">
          <div class="col-md-3">
            <img class="img-fluid mb-2" src="${avatar_url}">
            <a href="${html_url}" target="_blank" class="btn btn-primary btn-block mb-4">View Profile</a>
          </div>
          <div class="col-md-9">
            <span class="badge badge-primary">Public Repos: ${public_repos}</span>
            <span class="badge badge-secondary">Public Gists: ${public_gists}</span>
            <span class="badge badge-success">Followers: ${followers}</span>
            <span class="badge badge-info">Following: ${following}</span>
            <br><br>
            <ul class="list-group">
              <li class="list-group-item">Company: ${company}</li>
              <li class="list-group-item">Website/Blog: ${blog}</li>
              <li class="list-group-item">Location: ${location}</li>
              <li class="list-group-item">Member Since: ${created_at}</li>
            </ul>
          </div>
        </div>
      </div>
      <h3 class="page-heading mb-3">Latest Repos</h3>
      <div class="repos"></div>

      <h3 class="page-heading mb-3">Followers</h3>
      <div class="followers"></div>
    `;

  // // Repositories
  const repositoriesElement = document.querySelector(".repos");
  const reposList = document.createElement("ul");

  repositoriesList.forEach((repository) => {
    const li = document.createElement("li");
    li.textContent = repository.name;

    reposList.append(li);
  });

  repositoriesElement.append(reposList);

  // Followers
  const followersElement = document.querySelector(".followers");
  const list = document.createElement("ul");

  followerList.forEach((follower) => {
    const li = document.createElement("li");
    li.textContent = follower.login;

    list.append(li);
  });

  followersElement.append(list);
};

const clearProfile = () => {
  profile.innerHTML = "";
};

const handleInput = async (event) => {
  try {
    // Ховати повідомлення про помилку
    hideAlert();
    clearProfile();

    const value = event.target.value.trim();
    if (!value) {
      return;
    }

    const user = await api.getUser(value);
    const followers = await api.getFollowers(value, 6);
    console.log(followers);
    const repositories = await api.getRepositories(value, 5);
    console.log(repositories);
    showProfile(user, repositories, followers);
  } catch (error) {
    showAlert(error.message, "danger");
  }
};

inputSearch.addEventListener("input", slower(handleInput, 1.5));
