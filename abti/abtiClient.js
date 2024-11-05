(() => {
  const ABTI_SERVER_ORIGIN = "https://api.abti.store";

  window.abtiClient = window.abtiClient || {};

  if (abtiClient.initQueue) {
    processAbtiInitialization(abtiClient.initQueue).then(() => {
      handlePageVisit();
    });
  }

  abtiClient.initializeAbti = async (...args) => {
    abtiClient.initQueue = abtiClient.initQueue || args;

    await processAbtiInitialization(abtiClient.initQueue);

    handlePageVisit();
  };

  window.addEventListener("popstate", handlePageVisit);
  window.addEventListener("click", handleConversions);

  const originalPushState = history.pushState;
  const originalReplaceState = history.replaceState;

  history.pushState = function (...args) {
    originalPushState.apply(this, args);
    handlePageVisit();
  };

  history.replaceState = function (...args) {
    originalReplaceState.apply(this, args);
    handlePageVisit();
  };

  async function handlePageVisit() {
    const targetTestConfig = findTestConfigIndex();

    if (!targetTestConfig) {
      return;
    }

    await trackPagePathVisit(targetTestConfig);
  }

  async function handleConversions(e) {
    const targetTestConfig = findTestConfigIndex();

    if (!targetTestConfig) {
      return;
    }

    if (
      e.target.id !== targetTestConfig.targetElementId ||
      !e.target.classList.contains(targetTestConfig.targetElementId)
    ) {
      return;
    }

    await trackConversions(targetTestConfig);
  }

  async function trackPagePathVisit(testConfig) {
    const { testId } = testConfig;

    try {
      await updateSpecimenStatisticsByAction(testId, {
        type: "visitation",
        value: 1,
      });
    } catch (error) {
      console.error(
        "페이지 방문 통계 수집 과정 중 에러가 발생하였습니다.",
        error,
      );
    }
  }

  async function trackConversions(testConfig) {
    const { testId } = testConfig;

    try {
      await updateSpecimenStatisticsByAction(testId, {
        type: "conversion",
        value: 1,
      });
    } catch (error) {
      console.error("전환 이벤트 추적 과정 중 에러가 발생하였습니다.", error);
    }
  }

  function findTestConfigIndex() {
    const abtiTestConfig = abtiClient.testConfiguration;
    const { origin, pathname } = window.location;

    const testConfigIndex = abtiTestConfig.findIndex(testInfo => {
      const { pagePath, pageOrigin } = testInfo;

      return pageOrigin === origin && pagePath === pathname;
    });

    return abtiTestConfig[testConfigIndex];
  }

  async function processAbtiInitialization(testIdQueue) {
    abtiClient.distributedGroup = await fetchUserConfiguration();
    abtiClient.testConfiguration = await fetchTestConfigurations(testIdQueue);
  }

  async function fetchTestConfigurations(testIdQueue) {
    const requestTasks = testIdQueue.map(testId => {
      console.log(testId);
      return sendHttpRequestToAbti("GET", `/abti/tests/${testId}`);
    });

    const responses = await Promise.allSettled(requestTasks);

    return responses.map(res => {
      return res.value;
    });
  }

  async function fetchUserConfiguration() {
    const { distributedGroup } = await sendHttpRequestToAbti(
      "GET",
      `/abti/users/configuration`,
    );

    return distributedGroup;
  }

  async function updateSpecimenStatisticsByAction(testId, action) {
    return await sendHttpRequestToAbti(
      "PATCH",
      `/abti/tests/${testId}/specimen-statistics`,
      {
        groupName: abtiClient.distributedGroup,
        action,
      },
    );
  }

  async function sendHttpRequestToAbti(method, endpoint, data) {
    const response = await fetch(`${ABTI_SERVER_ORIGIN}${endpoint}`, {
      method: method,
      credentials: "include",
      headers: {
        "Access-Control-Allow-Origin": window.origin,
        "Content-type": "application/json",
      },
      body: data ? JSON.stringify(data) : null,
    });

    return await response.json();
  }
})();
