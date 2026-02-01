class LoginService:
  def __init__(self, username: str, password: str) -> None:
    self.username = username
    self.password = password



class RegistrationService:
  def __init__(self, password: str, mobile: str) -> None:
    self.password = password
    self.mobile = mobile
