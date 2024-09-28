(() => {
  const HASH_VALUE_MAX = 10000;
  const ABTI_SERVER_ORIGIN = "http://localhost:3000";
  const DISTRIBUTION_STANDARD_VALUE = 5000;

  window.abtiClient = window.abtiClient || {};

  abtiClient.distributeGroupByUserId = async (testId, userId) => {
    const hashValue = getHashValue(userId, HASH_VALUE_MAX);
    const distributedGroup =
      hashValue > DISTRIBUTION_STANDARD_VALUE ? "A" : "B";

    sessionStorage.setItem("distributedGroup", distributedGroup);

    try {
      const response = await updateSpecimenStatisticsByAction(testId, {
        type: "increase",
        targetProperty: "visitorSize",
        value: 1,
      });
    } catch (error) {
      console.error("그룹 분배 과정 중 에러가 발생하였습니다.", error);
    }
  };

  abtiClient.trackConversions = async testId => {
    const distributedGroup = sessionStorage.getItem("distributedGroup");

    if (!distributedGroup) {
      throw new Error("그룹이 분배되지 않았습니다.");
    }

    try {
      await updateSpecimenStatisticsByAction(testId, {
        type: "increase",
        targetProperty: "conversionsSize",
        value: 1,
      });
    } catch (error) {
      console.error("전환 이벤트 추적 과정 중 에러가 발생하였습니다.", error);
    }
  };

  abtiClient.getDistributedGroup = () => {
    try {
      const distributedGroup = sessionStorage.getItem("distributedGroup");

      if (!distributedGroup) {
        throw new Error("그룹이 분배되지 않았습니다.");
      }

      return distributedGroup;
    } catch (error) {
      console.error(error);
    }
  };

  function getHashValue(str, max) {
    let hash = 0;

    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) + hash + str.charCodeAt(i);
      hash = hash & hash;
      hash = Math.abs(hash);
    }

    return hash % max;
  }

  async function updateSpecimenStatisticsByAction(testId, action) {
    const abtiUserId = sessionStorage.getItem("abtiUserInfo");

    return await sendHttpRequestToAbti(
      "PATCH",
      `/abti/tests/${testId}/specimenStatistics`,
      {
        groupName: sessionStorage.getItem("distributedGroup"),
        action,
      },
    );
  }

  async function sendHttpRequestToAbti(method, endpoint, data) {
    return await fetch(`${ABTI_SERVER_ORIGIN}${endpoint}`, {
      method: method,
      headers: {
        "Access-Control-Allow-Origin": window.origin,
        "Content-type": "application/json",
      },
      body: data ? JSON.stringify(data) : null,
    });
  }
})();
