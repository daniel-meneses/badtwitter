


const UserPreview = () => {

  const elements = {
    userPreview: () => cy.byTestId('user-preview'),
    userName: () => cy.byTestId('user-info-name'),
    userAlias: () => cy.byTestId('user-info-alias'),
    userAvatar: () => cy.byTestId('user-info-avatar')
  }

  function getUserName() {
    const { userName } = elements;
    userName()
  }


  return {
    getUserName,
  }
}

export default UserPreview;