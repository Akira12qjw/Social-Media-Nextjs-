export function validateDateOfBirth(dateString: string): boolean {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      throw new Error("Ngày sinh không hợp lệ");
    }

    const today = new Date();
    const age = today.getFullYear() - date.getFullYear();

    if (age < 13) {
      throw new Error("Bạn phải từ 13 tuổi trở lên");
    }

    return true;
  } catch (error) {
    throw error;
  }
}

export function formatDateString(date: string): string {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function validatePassword(password: string): boolean {
  // Ít nhất 6 ký tự
  if (password.length < 6) {
    throw new Error("Mật khẩu phải có ít nhất 6 ký tự");
  }

  // Không quá 50 ký tự
  if (password.length > 50) {
    throw new Error("Mật khẩu không được quá 50 ký tự");
  }

  return true;
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error("Email không hợp lệ");
  }
  return true;
}
